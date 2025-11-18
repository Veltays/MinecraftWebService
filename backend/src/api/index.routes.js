/**
 * Fichier : src/api/index.routes.js
 * Auteur  : Veltays
 * Description :
 *  Point d'entrée des routes de l'API. Regroupe les sous-routes (servers, etc.).
 */

import express from "express";
import serverRoutes from "./domains/server.routes.js";
import serverInfoRoutes from "./domains/serverInfoRoutes.js";

const router = express.Router();

router.use("/servers", serverRoutes);
router.use("/server-info", serverInfoRoutes);


export default router;
