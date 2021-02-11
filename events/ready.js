module.exports = {
    event: "ready",
    async execute() {
        const client = this;
        console.log(`${client.user.tag} successfully authenticated!`);
        client.user.setActivity(`v${process.env.VERSION}!`);
    }
}