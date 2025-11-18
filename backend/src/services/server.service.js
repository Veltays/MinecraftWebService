/**
 * Fichier : src/services/server.service.js
 * Auteur  : Veltays
 * Description :
 *  Service métier pour la gestion des serveurs Minecraft.
 *  - Lister les serveurs
 *  - Créer un serveur via script bash
 *  - Démarrer un serveur
 *  - Arrêter un serveur
 *
 *  Toute la logique système (spawn, fs, état, process) est déléguée :
 *  - serverFileManager  -> gestion des fichiers
 *  - scriptExecutor     -> exécution de scripts
 *  - serverProcess      -> start/stop serveurs
 */

import { logger } from "../core/logger.js";
import { serverFileManager } from "./serverFileManager.service.js";
import { serverProcess } from "./serverProcess.service.js";
import { runScript } from "../utils/scriptExecutor.js";
import { SCRIPTS_PATH } from "../constants/paths.js";
import path from "path";

const CREATE_SCRIPT = path.join(SCRIPTS_PATH, "create_server.sh");

/* ================================
 * LIST SERVERS
 * ================================ */
export const listServers = () => {
    try {
        logger.info("Listing servers...");
        const servers = serverFileManager.list();

        logger.success(`Found ${servers.length} server(s)`);
        return servers;

    } catch (err) {
        logger.error("Failed to list servers:", err.message);
        throw new Error("Cannot list servers");
    }
};


/* ================================
 * CREATE SERVER
 * ================================ */
export const createServer = async (data) => {
    try {
        logger.info("Creating server...", data);

        const args = [
            data.name,
            data.version,
            data.ram + "G",
            data.type,
            data.worldType,
            data.seed || ""
        ];

        const result = await runScript("bash", [CREATE_SCRIPT, ...args]);

        // === CREATE CONFIG.JSON ===
        try {
            await serverFileManager.createConfig(data.name, data);
            logger.success(`Config.json created for server "${data.name}"`);
        }
        catch (err) {
            logger.error("Failed to create config.json:", err.message);
        }

        logger.success("Server created successfully 🎉");
        return result;

    } catch (err) {
        logger.error("Create server error:", err.message);
        throw new Error("Server creation failed");
    }
};


/* ================================
 * START SERVER
 * ================================ */
export const startServer = async (name) => {
    try {
        logger.info(`Starting server ${name}...`);

        await serverProcess.start(name);

        logger.success(`🟢 Server ${name} started`);
        return true;

    } catch (err) {
        logger.error(`Failed to start server ${name}:`, err.message);
        throw err;
    }
};


/* ================================
 * STOP SERVER
 * ================================ */
export const stopServer = async (name) => {
    try {
        logger.info(`Stopping server ${name}...`);

        await serverProcess.stop(name);

        logger.success(`🔴 Server ${name} stopped`);
        return true;

    } catch (err) {
        logger.error(`Failed to stop server ${name}:`, err.message);
        throw err;
    }
};
