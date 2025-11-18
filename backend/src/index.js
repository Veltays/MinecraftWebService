/**
 * Fichier : src/index.js
 * Auteur  : Veltays
 * Description :
 *  Point d'entrée principal de l'API Minecraft.
 */

import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { logger } from "./core/logger.js";
import loadExpress from "./loaders/express.js";
import { consoleWebSocket } from "./ws/console.ws.js";

const app = express();

// Charge Express (routes, middlewares…)
loadExpress(app);

// On crée un serveur HTTP pour supporter WebSocket
const server = http.createServer(app);

// === WebSocket ===
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) =>
{
    const url = req.url;

    if (url === "/ws/console")
    {
        return consoleWebSocket(ws, req);
    }

    ws.close();
});

// === Lancement du serveur ===
const PORT = 3001;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () =>
{
    logger.success(`Minecraft API + WS en ligne sur le port ${PORT}`);
});