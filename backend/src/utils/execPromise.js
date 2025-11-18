const { spawn } = require("child_process");

module.exports = function execPromise(cmd, args) {
    return new Promise((resolve, reject) => {
        const proc = spawn(cmd, args);
        let out = "";

        proc.stdout.on("data", d => out += d.toString());
        proc.stderr.on("data", d => out += d.toString());
        proc.on("close", () => resolve(out));
        proc.on("error", reject);
    });
};
