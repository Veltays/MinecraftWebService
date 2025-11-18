/**
 * Fichier : src/constants/paths.js
 * Auteur  : Veltays
 * Description :
 *  Génère dynamiquement les chemins ABSOLUS du backend :
 *  - SCRIPTS_PATH
 *  - SERVERS_PATH
 *  - PUBLIC_PATH
 *  Basé sur l'arborescence réelle (backend/src/...).
 */

import path from "path";
import { fileURLToPath } from "url";

// __dirname version ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROOT = /minecraft/backend
export const ROOT_PATH = path.join(__dirname, "../..");

// Dossier scripts : /minecraft/backend/src/scripts
export const SCRIPTS_PATH = path.join(ROOT_PATH, "src/scripts");

// Dossier servers : /minecraft/servers
export const SERVERS_PATH = path.join(ROOT_PATH, "../servers");

// Dossier public (frontend) : /minecraft/public
export const PUBLIC_PATH = path.join(ROOT_PATH, "../public");