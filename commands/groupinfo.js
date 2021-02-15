const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["factioninfo", "fi"],
    desc: "get information on a certain faction",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var groups = DataManager.getGroups();
        if (!Object.keys(groups).length)
            return message.channel.send("No groups exist at this time");

        var groupStr = "Enter the list number of the group. ex: first group on the list type 1\n\n";
        var i = 0;
        for (let key of Object.keys(groups)) {
            ++i;
            groupStr += `${i}) ${key}\n`;
        }

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**GROUPS**")
                .setDescription(groupStr)
        )

        client.messageListener.listen("groupinfo", message);
    }
}