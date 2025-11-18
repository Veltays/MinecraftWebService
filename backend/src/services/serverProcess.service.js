/**
 * Fichier : src/services/serverProcess.service.js
 * Auteur  : Veltays
 * Description :
 *  Lance, gère et arrête un serveur Minecraft via un process Java.
 */

import { spawn } from "child_process";
import { logger } from "../core/logger.js";
import { serverFileManager } from "./serverFileManager.service.js";
import { serverRuntime } from "../runtime/serverRuntime.store.js";
import { consoleBroadcaster } from "../ws/consoleBroadcaster.js";

export const serverProcess = {

    start: async (name) => {
        try {
            // Si déjà lancé
            if (serverRuntime.isRunning(name)) {
                logger.warn(`⚠️ Server ${name} already running`);
                return false;
            }

            const serverPath = serverFileManager.getServerPath(name);
            const config = serverFileManager.readConfig(name);

            const ram = config.ram || "2G";

            logger.info(`🚀 Starting server ${name} (RAM: ${ram})...`);

            // === LANCEMENT DIRECT JAVA ===
            const proc = spawn("java", [
                `-Xms${ram}`,
                `-Xmx${ram}`,
                "-jar",
                "server.jar",
                "nogui"
            ], {
                cwd: serverPath,
                stdio: ["pipe", "pipe", "pipe"] // important
            });

            // Enregistrement en runtime
            serverRuntime.set(name, proc);

            logger.success(`🟢 Process started for ${name}`);

            // Logs STDOUT
            proc.stdout.on("data", (chunk) => {
                const msg = chunk.toString().trim();
                consoleBroadcaster.broadcast(msg);
            });

            // Logs STDERR
            proc.stderr.on("data", (chunk) => {
                const msg = chunk.toString().trim();
                consoleBroadcaster.broadcast("[ERROR] " + msg);
            });

            // Fin du processus
            proc.on("close", (code) => {
                consoleBroadcaster.broadcast(`[STOP] Server exited with code ${code}`);
                serverRuntime.remove(name);
                logger.warn(`🔴 Server ${name} stopped`);
            });

            return true;
        }
        catch (err) {
            logger.error(`❌ Error starting server ${name}: ${err.message}`);
            throw err;
        }
    },

    stop: async (name) => {
        try {
            const proc = serverRuntime.get(name);

            if (!proc) {
                logger.warn(`⚠️ Server ${name} is not running`);
                return false;
            }

            logger.info(`🛑 Stopping server ${name} (stop command)...`);

            proc.stdin.write("stop\n");
            proc.stdin.end();            // 🔥 IMPORTANT

            return true;
        }
        catch (err) {
            logger.error(`❌ Error stopping server ${name}: ${err.message}`);
            throw err;
        }
    }
};
