/* EXETERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "createfaction",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;
        if (this.users[id].name) {
            delete this.users[id];
            message.channel.send("**Setup Cancelled**");
            return;
        }

        if (DataManager.getGroup(message.content.toLowerCase())) {
            message.channel.send("**Name already taken. Enter another name**");
            return;
        }

        this.users[id].name = message.content;

        var confirm = await message.channel.send(
            `**Are you sure you want to create ${this.users[id].name}?**`
        );
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
                var user = DataManager.getUser(id);
                user.group = this.users[id].name.toLowerCase();
                DataManager.setUser(id, user);
                DataManager.setGroup(this.users[id].name, { leader: id, members: [id], allies: [], war: ""});
                message.channel.send("**Faction Successfully created! Good Luck!**");
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
                started: new Date().getTime(),
                channelId: channelId,
                name: ""
            }
    }
}