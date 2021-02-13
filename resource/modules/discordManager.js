const Fs = require("fs");

module.exports = {
    findUser(data, message) {
        if (!data)
            return message.author;
        var mentioned = message.mentions.members.first();
        if (mentioned)
            return mentioned;
        let bymember = message.guild.members.cache.find(m => m.id == data || m.user.username.toLowerCase() == data || (m.nickname && m.nickname.toLowerCase() == data));
        if (bymember)
            return bymember;
        var UserJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/users.json`));
        for ([key, value] of Object.entries(UserJSON)) {
            if (value.username.toLowerCase() === data.toLowerCase())
                return message.guild.members.cache.find(m => m.id === key);
        }
        if (!bymember)
            bymember = message.guild.members.cache.find(m => m.user.username.toLowerCase().startsWith(data) || (m.nickname && m.nickname.toLowerCase().startsWith(data)));
        if (bymember) return bymember;
        for ([key, value] of Object.entries(UserJSON)) {
            if (value.username.toLowerCase().startsWith(data.toLowerCase()))
                return message.guild.members.cache.find(m => m.id === key);
        }
        return undefined;
    }
}