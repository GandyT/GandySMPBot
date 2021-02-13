const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    name: "groupinfo",
    users: {},
    async invoke(message) {
        const id = message.author.id;
        if (!this.users[id]) return false;
        if (this.users[id].channelId !== message.channel.id) return false;

        var groups = Object.entries(DataManager.getGroups());
        var choice = parseInt(message.content);
        if (!groups[choice - 1]) {
            delete this.users[id];
            return message.channel.send(`Invalid group. Choose from numbers 1-${groups.length}`);
        }
        var group = groups[choice - 1];
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`**${group[0]}**`)
                .setDescription(`**Leader: <@${group[1].leader}>**`)
                .addField(`**Member Count**`, `${group[1].members.length}/${process.env.MAX_MEMBERS}`)
        )
        delete this.users[id];

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