/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["joinfaction", "jf"],
    desc: "This command allows you to join a faction",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var user = DataManager.getUser(message.author.id);
        if(!user) return message.channel.send("**You do not have a profile. Type .start to setup your profile**");
        if(user.groups === "") return message.channel.send("**You are already in a group, Please leave it first if you wish to join a new one**");

        var groups = DataManager.getGroups();
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

        client.messageListener.listen("joinfaction", message);
    }
}