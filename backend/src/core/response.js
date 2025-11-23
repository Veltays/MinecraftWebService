/**
 * Fichier : src/core/response.js
 * Auteur  : Veltays
 * Description :
 *  Standardise les réponses API en JSON (success & error).
 */

export const success = (res, data = null, message = "OK", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

export const error = (res, message = "An error occurred", status = 500, details = null) => {
    return res.status(status).json({
        success: false,
        message,
        details
    });
};
