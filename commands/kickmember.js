/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["kickmember", "km"],
    desc: "This command kicks members",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var user = DataManager.getUser(message.author.id);
        if (!user) return message.channel.send("**You do not have a profile. Type .start to setup your profile**");
        if (user.group === "") return message.channel.send("**You are not in a group. You must be the leader of a group to kick someone**");

        var group = DataManager.getGroup(user.group);
        if (group.leader !== message.author.id)
            return message.channel.send("**You must be the leader of your group to kick someone**");

        message.channel.send("**Enter the user you want to kick**");
        client.messageListener.listen("kickmember", message);
    }
}