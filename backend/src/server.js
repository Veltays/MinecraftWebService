const express = require("express");
const loadExpress = require("./loaders/express");

const app = express();
loadExpress(app);

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => console.log("Minecraft API en ligne :", PORT));