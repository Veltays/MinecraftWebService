import { spawn } from "child_process";
import { logger } from "../core/logger.js";

export const runScript = (cmd, args, options = {}) => {
    return new Promise((resolve, reject) => {
        const proc = spawn(cmd, args, options);

        let output = "";

        proc.stdout.on("data", d => {
            logger.info(`[stdout] ${d.toString().trim()}`);
            output += d.toString();
        });

        proc.stderr.on("data", d => {
            logger.warn(`[stderr] ${d.toString().trim()}`);
            output += d.toString();
        });

        proc.on("close", code => {
            if (code !== 0) reject(new Error(`Script exited with code ${code}`));
            else resolve(output);
        });

        proc.on("error", reject);
    });
};
