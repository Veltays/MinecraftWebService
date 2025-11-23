export class ConsoleBroadcaster {
    constructor() {
        this.clients = new Set();
    }

    register(ws) {
        this.clients.add(ws);
    }

    unregister(ws) {
        this.clients.delete(ws);
    }

    broadcast(line) {
        const payload = JSON.stringify({
            type: "console",
            msg: line
        });

        for (const ws of this.clients) {
            try {
                ws.send(payload);
            } catch {}
        }
    }
}

export const consoleBroadcaster = new ConsoleBroadcaster();