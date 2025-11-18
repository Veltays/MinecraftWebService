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

// === Chemin absolu vers le dossier public ===
const PUBLIC_DIR = path.join(__dirname, "../../../public");

export default (app) => {
    app.use(cors());
    app.use(express.json());

    // === Fichiers statiques ===
    app.use(express.static(PUBLIC_DIR));

    // === Page index ===
    app.get("/", (req, res) => {
        res.sendFile(path.join(PUBLIC_DIR, "index.html"));
    });

    // === Routes API ===
    app.use("/api", routes);
};
