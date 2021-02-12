/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DiscordManager = require("../resource/modules/discordManager.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["userinfo", "ui"],
    desc: "This command gets info about a user",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var discordUser = DiscordManager.findUser(args[1], message);
        if (!discordUser) {
            return message.channel.send("That user does not exist.")
        }
        var SMPUser = DataManager.getUser(discordUser.id);
        if (!SMPUser) {
            return message.channel.send("That player does not play in the SMP");
        }

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`**${SMPUser.username}**'s profile`)
                .setDescription(`Tag - <@${discordUser.id}>`)
                .addField("Username", SMPUser.username)
                .addField("Group", SMPUser.group || "No Group")
        );
    }
}