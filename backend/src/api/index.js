const express = require("express");
const router = express.Router();

router.use("/servers", require("./domains/serverRoutes"));

module.exports = router;