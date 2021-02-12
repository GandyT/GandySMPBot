/* EXETERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "joinfaction",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;
        if (this.users[id].choice) {
            delete this.users[id];
            message.channel.send("**Setup Cancelled**");
            return;
        }

        var groups = Object.entries(DataManager.getGroups());
        var choice = parseInt(message.content);
        if (!groups[choice - 1]) 
            return message.channel.send(`Invalid group. Choose from numbers 1-${groups.length}`);
        
        this.users[id].choice = choice;

        const confirm = await message.channel.send(`Are you sure you want to join\n**${groups[choice - 1][0]}**?`);
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
                DataManager.setUser(id, user);
                var group = DataManager.getGroup(user.group);
                group.requests.push(id);
                DataManager.setGroup(user.group, group);
                message.channel.send(`**Requested to join ${groups[choice - 1][0]}! Good Luck!**`);
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