/**
 * Fichier : src/utils/execPromise.js
 * Auteur  : Veltays
 * Description :
 *  Exécute une commande système en mode promisifié (stdout + stderr combinés).
 */

import { spawn } from "child_process";

export default function execPromise(cmd, args = []) {
    return new Promise((resolve, reject) => {
        const proc = spawn(cmd, args);
        let out = "";

        proc.stdout.on("data", (d) => {
            out += d.toString();
        });

        proc.stderr.on("data", (d) => {
            out += d.toString();
        });

        proc.on("close", () => resolve(out));

        proc.on("error", (err) => reject(err));
    });
}
