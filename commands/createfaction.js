/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["createfaction", "cf"],
    desc: "This command is to create a faction",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var user = DataManager.getUser(message.author.id);
        if (!user) 
            return message.channel.send(`You have not joined the SMP. Type ${process.env.PREFIX}start to join!`);
        
        if (user.group !== "")
            return message.channel.send("You are already in a faction.");
        
        client.messageListener.listen("createfaction", message);
        message.channel.send(`<@${message.author.id}>, please enter the name of your faction`);
    }
}