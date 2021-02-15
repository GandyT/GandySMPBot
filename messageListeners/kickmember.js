/* EXETERNAL MODULES */
const Discord = require("discord.js");
const DiscordManager = require("../resource/modules/discordManager.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "kickmember",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;

        if (this.users[id].hasUser) {
            delete this.users[id];
            message.channel.send("**Setup Cancelled**");
            return;
        }

        var user = DiscordManager.findUser(message.content.toLowerCase(), message);
        if (user.id === message.author.id) {
            delete this.users[id];
            return message.channel.send("**You may not kick youreslf, setup cancelled**")
        }

        var smpUser = DataManager.getUser(user.id);
        if (!smpUser) {
            delete this.users[id];
            return message.channel.send("**That user does not exist, setup cancelled**");
        }

        var leader = DataManager.getUser(message.author.id);
        if (smpUser.group !== leader.group) {
            return message.channel.send("**That user is not in your group, setup cancelled**");
        }
        var group = DataManager.getGroup(leader.group);

        const confirm = await message.channel.send(`**Kick ${smpUser.username} from ${smpUser.group}?**`);
        await confirm.react("✅");
        await confirm.react("❌");

        await confirm.awaitReactions(
            (reaction, user) => (
                reaction.emoji.name === "✅" ||
                reaction.emoji.name === "❌"
            ) && user.id === id,
            { max: 1 }
        ).then(collected => {
            const reaction = collected.first();
            if (!reaction) return;
            if (reaction.emoji.name === "✅") {
                smpUser.group = "";
                DataManager.setUser(user.id, smpUser);
                group.members = group.members.filter(m => m !== user.id);
                DataManager.setGroup(leader.group, group);
                message.channel.send(`**${smpUser.username} has been kicked from ${leader.group}.**`);
            } else {
                message.channel.send("**Setup Cancelled**");
            }

            confirm.delete();
            delete this.users[id];
        });
    },
    add(userId, channelId, data) {
        if (!this.users[userId])
            this.users[userId] = {
                id: userId,
                data: data,
                hasUser: false,
                started: new Date().getTime(),
                channelId: channelId,
            }
    }
}