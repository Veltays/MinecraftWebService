import fs from "fs";
import path from "path";
import { SERVERS_PATH } from "../constants/paths.js";

// TEMP LOG
console.log("SERVERS_PATH =", SERVERS_PATH);

export const serverFileManager = {

    list: () =>
        fs.readdirSync(SERVERS_PATH).filter(name =>
            fs.lstatSync(path.join(SERVERS_PATH, name)).isDirectory()
        ),

    createConfig(name, data) {
        const folder = path.join(SERVERS_PATH, name);
        const configPath = path.join(folder, "config.json");

        const json = JSON.stringify(data, null, 4);

        fs.writeFileSync(configPath, json);

        return true;
    },

    readConfig(name) {
        const folder = path.join(SERVERS_PATH, name);
        const configPath = path.join(folder, "config.json");

        if (!fs.existsSync(configPath)) {
            throw new Error(`config.json not found for server ${name}`);
        }

        const raw = fs.readFileSync(configPath, "utf8");
        return JSON.parse(raw);
    },

    startScriptExists: (name) =>
        fs.existsSync(path.join(SERVERS_PATH, name, "start.sh")),

    getServerPath: (name) =>
        path.join(SERVERS_PATH, name),

    getStartScript: (name) =>
        path.join(SERVERS_PATH, name, "start.sh"),

    // ================================
    // === NOUVELLES MÉTHODES POUR DELETE ===
    // ================================

    /**
     * Vérifie si le dossier du serveur existe.
     */
    exists: (name) =>
        fs.existsSync(path.join(SERVERS_PATH, name)),

    /**
     * Supprime le dossier complet du serveur de manière récursive.
     */
    delete: (name) => {
        const folder = path.join(SERVERS_PATH, name);

        // fs.rmSync est l'équivalent moderne pour la suppression de dossiers récursive.
        fs.rmSync(folder, { recursive: true, force: true });
    }
};