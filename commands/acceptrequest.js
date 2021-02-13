/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

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
        var group = DataManager.getGroup(user.group);
        if (group.leader !== message.author.id)
            return message.channel.send("You are not the leader of your group.")
        if (!group.requests.length)
            return message.channel.send("Your group does not have any pending requests");

        var requestStr = "Type the number for the user you want to accept. ex: first user type 1\n\n";
        group.requests.forEach((id, i) => {
            requestStr += `${i + 1}) <@${id}>\n`;
        })

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**Ongoing Requests**")
                .setDescription(requestStr)
        );
        client.messageListener.listen("acceptrequest", message, message.channel.id, { name: user.group });
    }
}