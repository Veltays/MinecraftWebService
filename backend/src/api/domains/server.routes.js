/**
 * Fichier : src/api/domains/server.routes.js
 * Auteur  : Veltays
 * Description :
 *  Définition des routes liées aux lancement et a la fermeture des serveurs Minecraft.
 *  Relié au controller server.controller.js.
 */

import express from "express";
import controller from "../../controllers/server.controller.js";

const router = express.Router();

router.get("/", controller.list);
router.post("/create", controller.create);
router.post("/start/:name", controller.start);
router.post("/stop/:name", controller.stop);

export default router;