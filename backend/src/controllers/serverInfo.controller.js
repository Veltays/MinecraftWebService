/**
 * Fichier : src/controllers/serverInfo.controller.js
 * Auteur : Veltays
 * Description :
 * Controller pour les informations d’un serveur Minecraft.
 */

import { getServerInfo } from "../services/serverInfo.service.js";
import { success, error } from "../core/response.js";

export const getServerInfoController = (req, res) =>
{
    try
    {
        const name = req.params.name;

        const data = getServerInfo(name);

        return success(
            res,
            data,
            `Infos du serveur "${name}" chargées`
        );
    }
    catch (err)
    {
        return error(
            res,
            "Impossible de charger les informations du serveur",
            500,
            err.message
        );
    }
};