const { spawn } = require("child_process");
const fs = require("fs");
const path = "/home/veltays/ssd/HomeOnSSD/minecraft/servers/";

let running = {};

module.exports = {
    listServers() {
        return fs.readdirSync(path).filter(f => fs.lstatSync(path + f).isDirectory());
    },

    createServer(data) {
        return new Promise((resolve, reject) => {
            const script = "/home/veltays/ssd/HomeOnSSD/minecraft/backend/scripts/create_server.sh";

            const args = [
                data.name,
                data.version,
                data.ram,
                data.type,
                data.worldType,
                data.seed || ""
            ];

            const proc = spawn("bash", [script, ...args]);

            let output = "";

            proc.stdout.on("data", (d) => (output += d.toString()));
            proc.stderr.on("data", (d) => (output += d.toString()));

            proc.on("close", () => resolve(output));
            proc.on("error", (err) => reject(err));
        });
    },

    startServer(name) {
        if (running[name]) return;

        const serverPath = path + name;
        const startFile = `${serverPath}/start.sh`;

        const proc = spawn("bash", [startFile], {
            cwd: serverPath,
            detached: true
        });

        running[name] = proc;

        console.log(`🟢 Serveur ${name} STARTED`);
    },

    stopServer(name) {
        if (!running[name]) return;
        running[name].kill("SIGINT");

        console.log(`🔴 Serveur ${name} STOPPED`);
        delete running[name];
    }
};
