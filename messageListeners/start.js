/* EXETERNAL MODULES */
const Discord = require("discord.js");
const UserManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "start",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;
        if (this.users[id].username !== undefined) {
            delete this.users[id];
            message.channel.send("**Setup Cancelled**");
            return;
        }

        this.users[id].username = message.content;
        var confirm = await message.channel.send(
            `**Are you sure your username is ${this.users[id].username}?**`
        );
        await confirm.react("✅");
        await confirm.react("❌");

        await confirm.awaitReactions(
            reaction => reaction.emoji.name === "✅" || reaction.emoji.name === "❌",
            { max: 1 }
        ).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "✅") {
                UserManager.setUser(id, { username: this.users[id].username, group: "" });
                message.channel.send("**Profile Successfully created! Have fun!**");
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
                username: undefined
            }
    }
}