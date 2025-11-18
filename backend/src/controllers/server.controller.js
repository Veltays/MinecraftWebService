const service = require("../services/server.service");

module.exports = {
    list(req, res) {
        res.json(service.listServers());
    },

    async create(req, res) {
        try {
            const result = await service.createServer(req.body);
            res.json({ success: true, log: result });
        } catch (e) {
            res.json({ success: false, error: e.message });
        }
    },

    start(req, res) {
        service.startServer(req.params.name);
        res.json({ success: true });
    },

    stop(req, res) {
        service.stopServer(req.params.name);
        res.json({ success: true });
    }
};
