const Fs = require("fs");

module.exports = {
    getUser: id => {
        var UserJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/users.json`));
        return UserJSON[id];
    },
    getGroup: name => {
        var GroupJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/groups.json`));
        return GroupJSON[name.toLowerCase()]
    },
    removeGroup: name => {
        var GroupJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/groups.json`));
        if (!GroupJSON[name.toLowerCase()])
            return false;
        delete GroupJSON[name.toLowerCase()];
        Fs.writeFileSync(`${__dirname}/../../data/groups.json`, JSON.stringify(GroupJSON));
        return true;
    },
    getGroups: () => {
        return JSON.parse(Fs.readFileSync(`${__dirname}/../../data/groups.json`));
    },
    getWars: () => {
        var WarJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/wars.json`));
        return WarJSON;
    },
    setUser: (id, data) => {
        var UserJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/users.json`));
        UserJSON[id] = data;
        Fs.writeFileSync(`${__dirname}/../../data/users.json`, JSON.stringify(UserJSON));
    },
    setGroup: (name, data) => {
        var GroupJSON = JSON.parse(Fs.readFileSync(`${__dirname}/../../data/groups.json`));
        GroupJSON[name.toLowerCase()] = data;
        Fs.writeFileSync(`${__dirname}/../../data/groups.json`, JSON.stringify(GroupJSON));
    }
}