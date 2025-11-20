/**
 * Fichier : src/loaders/express.js
 */

import express from "express";
import cors from "cors";
import path from "path";
import routes from "../api/index.routes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "../../../public");

export default (app) =>
{
    // === CORS global ===
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));

    // === Préflight OPTIONS (compatible Express toutes versions) ===
    app.use((req, res, next) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            return res.sendStatus(200);
        }
        next();
    });

    app.use(express.json());

    // Fichiers statiques
    app.use(express.static(PUBLIC_DIR));

    app.get("/", (req, res) => {
        res.sendFile(path.join(PUBLIC_DIR, "index.html"));
    });

    app.use("/api", routes);
};
