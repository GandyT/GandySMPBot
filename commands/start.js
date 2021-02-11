/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager");

module.exports = {
    names: ["start"],
    desc: "join the SMP!",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (DataManager.getUser(message.author.id)) return message.channel.send("**You already have a profile created**");
        client.messageListener.listen("start", message);
        message.channel.send(
            `<@${message.author.id}>, please enter your minecraft username`
        );
    }
}