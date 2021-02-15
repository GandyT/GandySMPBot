/* EXTERNAL MODULES */
const Discord = require("discord.js");

module.exports = {
    names: ["help"],
    desc: "gets the help page",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        if (!args[1])
            return message.channel.send("Please specify a page");
        var page = parseInt(args[1]);
        if (isNaN(page))
            return message.channel.send(`Page must be a number from 1-${Math.ceil(client.commands.length / 10)}`);
        if (page > Math.ceil(client.commands.length / 10))
            return message.channel.send(`Page must be a number from 1-${Math.ceil(client.commands.length / 10)}`);

        var last = page * 10;
        if (last > client.commands.length) last = client.commands.length;
        var commands = client.commands.slice((page - 1) * 10, last);

        var commandStr = "";
        commands.forEach(cmd => {
            commandStr += `**${cmd.names[0]}** - ${cmd.desc}\n\n`;
        });

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**HELP**")
                .setDescription(commandStr)
                .setFooter(`Page ${page}`)
        );
    }
}