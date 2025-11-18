/**
 * Fichier : src/services/serverInfo.service.js
 * Auteur : Veltays
 * Description :
 * Service dédié aux informations d’un serveur Minecraft.
 */

import fs from "fs";
import path from "path";
import { logger } from "../core/logger.js";
import { SERVERS_PATH } from "../constants/paths.js";

/* ================================
 * GET SERVER INFO
 * ================================ */
export const getServerInfo = (name) =>
{
    try
    {
        logger.info(`Reading server info for "${name}"...`);

        const configPath =
            path.join(SERVERS_PATH, name, "config.json");

        const exists = fs.existsSync(configPath);

        if (!exists)
        {
            throw new Error(`Config.json not found for server "${name}"`);
        }

        const raw = fs.readFileSync(configPath, "utf8");

        const data = JSON.parse(raw);

        logger.success(`Info loaded for server "${name}"`);

        return data;
    }
    catch (err)
    {
        logger.error(
            `Failed to read info for server "${name}":`,
            err.message
        );

        throw err;
    }
};