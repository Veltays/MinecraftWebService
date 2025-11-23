/**
 * Fichier : src/api/domains/Info.routes.js
 * Auteur : Veltays
 * Description :
 * Routes pour les informations serveur.
 */

import express from "express";
import { getServerInfoController } from "../../controllers/serverInfo.controller.js";

const router = express.Router();

router.get("/:name", getServerInfoController);

export default router;