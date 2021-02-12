const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["groupinfo", "ginfo"],
    desc: "get information on a certain group",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var user = DataManager.getUser(message.author.id);
        if(!user) return message.channel.send("**You do not have a profile. Type .start to setup your profile**");
    }
}