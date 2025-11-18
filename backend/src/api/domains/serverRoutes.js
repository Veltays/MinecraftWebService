const express = require("express");
const router = express.Router();
const controller = require("../../controllers/server.controller");

router.get("/", controller.list);
router.post("/create", controller.create);
router.post("/start/:name", controller.start);
router.post("/stop/:name", controller.stop);

module.exports = router;