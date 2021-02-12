const Discord = require("discord.js");
const DataManager = require("../resource/modules/dataManager.js");

module.exports = {
    names: ["transferleader", "tl"],
    desc: "transfer the leadership of the group",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables

        var user = DataManager.getUser(message.author.id);
        if(!user) return message.channel.send("**You do not have a profile. Type .start to setup your profile**");
        if(user.group === "") return message.channel.send("**You are not currently in a group. To join a group type .joinfaction [groupname]**");

        var group = DataManager.getGroup(user.group);
        if(!args[1]) return message.channel.send("**please mention the user that you wish to tranfer leadership to**");
        var mentioned = message.mentions.members.first();
        if(!mentioned) return message.channel.send("**Please ping the user you wish to transfer ownership to**");
        var mentionedUser = DataManager.getUser(mentioned.id);
        if(!mentionedUser) return message.channel.send("**The user that you have mentioned has not started the game. They need to type .start to set up their profile**");
        if(!group.members.find(id => id === mentioned.id)) return message.channel.send("**The mentioned user is not in your group, please choose someone in your group to transfer ownership to**");
        if(group.leader !== message.author.id) return message.channel.send("**You are not a group leader**");

        const confirm = await message.channel.send(`Would you like to transfer ownership of ${user.group} to <@${mentioned.id}>?`);
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
                message.channel.send(`**You have successfully transfered ownership of ${user.group}**`); // sends message
                group.leader = mentioned.id; // removes users group
                DataManager.setGroup(user.group, group); // saves user to databse
            } else {
                // User said no
                message.channel.send("**Cancelled**");
            }

            confirm.delete();
        });
    }
}