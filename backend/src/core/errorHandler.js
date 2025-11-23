/**
 * Fichier : src/core/errorHandler.js
 * Auteur  : Veltays
 * Description :
 *  Middleware global de gestion d'erreurs.
 *  Log l'erreur puis renvoie une réponse JSON formatée.
 */

import { logger } from "./logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(err.message, err.stack);

    const status = err.status || 500;

    return res.status(status).json({
        success: false,
        message: err.message || "Internal server error",
        details: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
