module.exports = {
    event: "message",
    async execute(message) {
        const client = this;

        if (!message.member.roles.cache.find(r => r.id === process.env.SMP_ROLE)) return;
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (client.messageListener.invoke(message) === true) return;
        
        if (message.content.startsWith(process.env.PREFIX)) {
            var env = {
                message: message,
                args: message.content
                    .toLowerCase()
                    .substr(process.env.PREFIX.length)
                    .split(" "),
                client: client
            };

            var command = client.commands.find(env.args[0]);
            if (command) command.execute(env);
        }
    }
}