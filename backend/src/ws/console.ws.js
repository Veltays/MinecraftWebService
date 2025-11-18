/**
 * WebSocket Console
 */

import { logger } from "../core/logger.js";
import { consoleBroadcaster } from "./consoleBroadcaster.js";
import { serverRuntime } from "../runtime/serverRuntime.store.js";

export const consoleWebSocket = (ws, req) => {
    logger.info("Client connected to WS console");
    consoleBroadcaster.register(ws);

    ws.send(JSON.stringify({
        type: "info",
        msg: "Console connected."
    }));

    ws.on("message", (raw) => {
        const data = JSON.parse(raw);

        if (data.type === "cmd") {
            const proc = serverRuntime.get(data.server);

            if (!proc) {
                ws.send(JSON.stringify({
                    type: "console",
                    msg: "[ERROR] Aucun serveur n'est en cours d'exécution"
                }));
                return;
            }

            proc.stdin.write(data.cmd + "\n");
        }
    });

    ws.on("close", () => {
        consoleBroadcaster.unregister(ws);
        logger.warn("Console WS client disconnected");
    });
};
