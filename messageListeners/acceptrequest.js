/* EXETERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "acceptrequest",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;
        if (this.users[id].choice) {
            delete this.users[id];
            message.channel.send("**Selection Cancelled**");
            return;
        }

        var choice = parseInt(message.content);
        var group = DataManager.getGroup(this.users[id].data.name);
        var requester = group.requests[choice - 1];

        if (!requester)
            return message.channel.send("Invalid Selection. Try again");
        this.users[id].choice = choice;

        const confirm = await message.channel.send(`**Are you sure you want to accept <@${group.requests[choice - 1]}> to ${this.users[id].data.name}?**`)

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
                var user = DataManager.getUser(requester);
                if (user.group !== "") {
                    delete this.users[id];
                    message.channel.send("**That user has already joined a group**");
                    return;
                }
                user.group = this.users[id].data.name;
                DataManager.setUser(requester, user);
                group.members.push(requester);
                group.requests.filter(id => id !== requester);
                if (group.members.length >= 5) group.requests = [];
                DataManager.setGroup(user.group, group);
                message.channel.send(`**<@${requester}> Successfully Accepted!**`);
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
                choice: undefined,
                started: new Date().getTime(),
                channelId: channelId,
            }
    }
}