/**
 * Fichier : src/controllers/server.controller.js
 * Auteur  : Veltays
 * Description :
 *  Contrôleur gérant les actions sur les serveurs Minecraft (list, create, start, stop).
 */

import * as service from "../services/server.service.js";
import { success, error } from "../core/response.js";

export default {
    list(req, res) {
        try {
            const servers = service.listServers();
            return success(res, servers, "Liste des serveurs récupérée");
        } catch (e) {
            return error(res, "Impossible de récupérer les serveurs", 500, e.message);
        }
    },

    async create(req, res) {
        try {
            const result = await service.createServer(req.body);
            return success(res, result, "Serveur créé avec succès");
        } catch (e) {
            return error(res, "Erreur lors de la création du serveur", 500, e.message);
        }
    },

    start(req, res) {
        try {
            service.startServer(req.params.name);
            return success(res, null, "Serveur démarré");
        } catch (e) {
            return error(res, "Impossible de démarrer ce serveur", 500, e.message);
        }
    },

    stop(req, res) {
        try {
            service.stopServer(req.params.name);
            return success(res, null, "Serveur arrêté");
        } catch (e) {
            return error(res, "Impossible d'arrêter ce serveur", 500, e.message);
        }
    }
};
