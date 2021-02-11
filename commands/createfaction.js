/* EXTERNAL MODULES */
const Discord = require("discord.js");

module.exports = {
    names: ["template"],
    desc: "this is a template command",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
    }
}