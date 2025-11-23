/**
 * Fichier : src/core/logger.js
 * Auteur  : Veltays
 * Description :
 *  Logger simple avec couleurs et timestamp pour un suivi clair en console.
 */

const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    green: "\x1b[32m"
};

const timestamp = () => new Date().toISOString();

export const logger = {
    info: (...msg) =>
        console.log(colors.blue, `[INFO] [${timestamp()}]`, ...msg, colors.reset),

    success: (...msg) =>
        console.log(colors.green, `[SUCCESS] [${timestamp()}]`, ...msg, colors.reset),

    warn: (...msg) =>
        console.warn(colors.yellow, `[WARN] [${timestamp()}]`, ...msg, colors.reset),

    error: (...msg) =>
        console.error(colors.red, `[ERROR] [${timestamp()}]`, ...msg, colors.reset)
};
