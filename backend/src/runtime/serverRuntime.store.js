let runningServers = {};

export const serverRuntime = {
    isRunning: (name) => !!runningServers[name],
    get: (name) => runningServers[name],
    set: (name, proc) => (runningServers[name] = proc),
    remove: (name) => delete runningServers[name],
    all: () => runningServers
};
