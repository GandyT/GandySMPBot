/* EXTERNAL MODULES */
const Discord = require("discord.js");

module.exports = {
    names: ["acceptrequest", "ar"],
    desc: "accept a user to your faction",
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
        if (user.group === "")
            return message.channel.send("You are not in a faction.");
    }
}