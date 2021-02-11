class MessageListener {
    constructor(listeners) {
        this._listeners = listeners;
    }

    get listeners() {
        return this._listeners;
    };

    listen(type, message, channelId, data = {}) {
        var listener = this._listeners.find(l => l.name.toLowerCase() == type.toLowerCase());
        if (listener) listener.add(message.author.id, channelId || message.channel.id, data);
    }

    invoke(message) {
        var found = false;
        this._listeners.map(listener => {
            if (found) return;
            if (listener.users[message.author.id]) {
                listener.invoke(message);
                found = true;
            }
        });

        return found;
    }
}

module.exports = MessageListener;