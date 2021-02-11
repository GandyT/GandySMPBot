/* EXETERNAL MODULES */
const Discord = require("discord.js");

module.exports = {
    name: "template",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;
    },
    add(userId, channelId, data) {
        if (!this.users[userId])
            this.users[userId] = {
                id: userId,
                data: data,
                started: new Date().getTime(),
                channelId: channelId,
            }
    }
}