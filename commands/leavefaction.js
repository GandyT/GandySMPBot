/* EXTERNAL MODULES */
const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["leavefaction", "lf"],
    desc: "leaves the current faction you're in",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        var user = DataManager.getUser(message.author.id);
        if (!user) return message.channel.send("**You do not have a profile. Type .start to setup your profile**");
        if(user.group === "") return message.channel.send("**You are currently not in a group. To join a group type .joinfaction [groupname]**")
        var group = DataManager.getGroup(user.group);
        if (group.leader === message.author.id) return message.channel.send("**You are the leader of the group. Type .disbandfaction to disband your group or type .transferfaction to transfer ownership to another member**");
        
        const confirm = await message.channel.send(`Would you like to leave ${user.group}?`);
        await confirm.react("✅");
        await confirm.react("❌");

        await confirm.awaitReactions(
            (reaction, user) => (
                reaction.emoji.name === "✅" || // filters when listening to reactions
                reaction.emoji.name === "❌"
                ) && user.id === message.author.id,
            { max: 1 }
        ).then(collected => {
            const reaction = collected.first();
            if (!reaction) return;
            if (reaction.emoji.name === "✅") {
                // User said yes
                message.channel.send(`**You have successfully left ${user.group}**`); // sends message
                user.group = ""; // removes users group
                DataManager.setUser(message.author.id, user); // saves user to databse
            } else {
                // User said no
                message.channel.send("**Cancelled**");
            }

            confirm.delete();
        });
    }
}