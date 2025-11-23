/**
 * Fichier : src/index.js
 * Description :
 *  Point d'entrée principal de l'API Minecraft + WebSockets.
 */

import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { logger } from "./core/logger.js";
import loadExpress from "./loaders/express.js";
import { consoleWebSocket } from "./ws/console.ws.js";

const app = express();

// Charger Express (middleware, routes…)
loadExpress(app);

// Créer serveur HTTP pour gérer WebSocket
const server = http.createServer(app);

// === WebSocket ===
// CORS WS : on les autorise via verifyClient (méthode propre)
const wss = new WebSocketServer({
    server,
    verifyClient: (info, done) =>
    {
        // Ici tu peux filtrer des domaines si tu veux
        // Exemple: if(info.origin !== "http://ton-site.com") return done(false);
        done(true);
    }
});

wss.on("connection", (ws, req) =>
{
    const url = req.url;

    if (url === "/ws/console")
    {
        return consoleWebSocket(ws, req);
    }

    ws.close();
});

// === Lancer le serveur ===
const PORT = 5000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () =>
{
    logger.success(`Minecraft API + WebSocket opérationnels sur ${HOST}:${PORT}`);
});
