
const DotEnv = require("dotenv");
DotEnv.config();

const Fs = require("fs");
const MessageListener = require("./resource/classes/messageListener.js");

const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "everyone" });

var commands = [];
commands.find = name => {
    name = name.toLowerCase();
    for (const cmd of commands)
        if (cmd.names.includes(name))
            return cmd;
    return null;
}

/* HANDLERS */
Fs.readdir("commands", (err, files) => {
    if (err) throw new Error(err);

    files.forEach(file => {
        commands.push(require(`./commands/${file}`));
    });
    client.commands = commands;
});
Fs.readdir("events", (err, files) => {
    if (err) throw new Error(err);

    files.forEach(file => {
        var eventListener = require(`./events/${file}`);
        client.on(eventListener.event, eventListener.execute.bind(client));
    });
});
Fs.readdir("messageListeners", (err, files) => {
    if (err) throw new Error(err);

    var messageListeners = [];
    files.forEach(file => {
        messageListeners.push(require(`./messageListeners/${file}`));
    });

    client.messageListener = new MessageListener(messageListeners);
});

/* INITIALIZATION */
console.log(`Loading ${process.env.NAME} v${process.env.VERSION}...`);
client.login(process.env.TOKEN);