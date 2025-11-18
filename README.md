🧩 README — Raspb Minecraft Panel

Un panel web minimaliste permettant de gérer plusieurs serveurs Minecraft (Paper/Vanilla) hébergés sur un Raspberry Pi.
Le projet fournit :

✔️ Un backend Node.js (Express + WebSocket)

✔️ Un système de gestion des serveurs (start/stop, RAM config, logs)

✔️ Une console live (STDOUT/STDERR)

✔️ Une architecture propre (routes, controllers, services, constants)

✔️ Un mode daemon via PM2

✔️ Une compatibilité Raspberry Pi (ARM64/ARMv7)

🚀 Fonctionnalités
🎮 Gestion des serveurs Minecraft

Lister les serveurs installés

Lire les configurations (config.json)

Démarrer / arrêter un serveur (java -jar server.jar nogui)

Détecter si un serveur est déjà en cours d’exécution

Gestion de la RAM par serveur (-Xms / -Xmx)

🖥️ Console Minecraft en temps réel

Affichage des logs STDOUT / STDERR

Nettoyage des codes ANSI pour une lecture propre

Envoi de commandes à la console depuis le front

🗂️ Fichiers & structure

- Dossiers individuels pour chaque instance de serveur
- Gestion via serverFileManager (lecture / écriture des configs)


🌍 Accessible depuis l’extérieur
```
Port 3001 accessible publiquement
Compatible avec PM2 pour tourner en background
```
📦 Structure du Projet
```
.
├── backend
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── api
│       │   ├── domains
│       │   └── index.routes.js
│       ├── constants
│       │   └── paths.js
│       ├── controllers
│       │   ├── server.controller.js
│       │   └── serverInfo.controller.js
│       ├── core
│       │   ├── errorHandler.js
│       │   ├── logger.js
│       │   └── response.js
│       ├── index.js
│       ├── loaders
│       │   └── express.js
│       ├── runtime
│       │   ├── consoleClients.store.js
│       │   └── serverRuntime.store.js
│       ├── scripts
│       │   └── create_server.sh
│       ├── services
│       │   ├── serverFileManager.service.js
│       │   ├── serverInfo.service.js
│       │   ├── serverProcess.service.js
│       │   └── server.service.js
│       ├── utils
│       │   ├── execPromise.js
│       │   └── scriptExecutor.js
│       └── ws
│           ├── consoleBroadcaster.js
│           └── console.ws.js
└── public
    ├── assets
    │   ├── app.js
    │   ├── css
    │   │   ├── base.css
    │   │   ├── components.css
    │   │   ├── layout.css
    │   │   └── pages
    │   ├── img
    │   ├── js
    │   │   ├── api
    │   │   ├── components
    │   │   ├── pages
    │   │   └── utils
    │   └── style.css
    ├── console.html
    ├── create.html
    ├── favicon.ico
    ├── index.html
    └── server.html
    ```

