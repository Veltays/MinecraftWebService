export const consoleClients = {
    list: [],

    add(ws) {
        this.list.push(ws);
    },

    remove(ws) {
        this.list = this.list.filter(c => c !== ws);
    },

    broadcast(type, msg) {
        const payload = JSON.stringify({ type, msg });

        this.list.forEach(ws => {
            if (ws.readyState === ws.OPEN) ws.send(payload);
        });
    }
};