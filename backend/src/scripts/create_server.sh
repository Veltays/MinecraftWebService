#!/bin/bash

# ============================================================
#   Minecraft Server Generator (API Edition - Non Interactive)
# ============================================================

SERVER_ROOT="/home/veltays/ssd/HomeOnSSD/minecraft/servers"

# Arguments
SERVER_NAME="$1"
VERSION="$2"
RAM="$3"
TYPE="$4"
WORLD_TYPE="$5"
SEED="$6"

if [ -z "$SERVER_NAME" ] || [ -z "$VERSION" ] || [ -z "$RAM" ] || [ -z "$TYPE" ] || [ -z "$WORLD_TYPE" ]; then
    echo "ERROR: Missing arguments"
    exit 1
fi

SERVER_DIR="$SERVER_ROOT/$SERVER_NAME"
mkdir -p "$SERVER_DIR"

echo "[OK] Dossier créé : $SERVER_DIR"
cd "$SERVER_DIR"

# ---- Download server ----
echo "[INFO] Téléchargement serveur : $TYPE / $VERSION"

if [[ "$TYPE" == "paper" ]]; then
    BUILD=$(curl -s "https://api.papermc.io/v2/projects/paper/versions/$VERSION" | jq -r '.builds[-1]')
    echo "[INFO] Build détecté : $BUILD"
    wget -O server.jar "https://api.papermc.io/v2/projects/paper/versions/$VERSION/builds/$BUILD/downloads/paper-$VERSION-$BUILD.jar"

elif [[ "$TYPE" == "purpur" ]]; then
    wget -O server.jar "https://api.purpurmc.org/v2/purpur/$VERSION/latest/download"

elif [[ "$TYPE" == "vanilla" ]]; then
    MANIFEST=$(curl -s https://launchermeta.mojang.com/mc/game/version_manifest.json)
    VERSION_URL=$(echo "$MANIFEST" | jq -r ".versions[] | select(.id==\"$VERSION\") | .url")
    SERVER_URL=$(curl -s "$VERSION_URL" | jq -r ".downloads.server.url")
    wget -O server.jar "$SERVER_URL"
fi

echo "[OK] Téléchargement terminé"

# ---- EULA ----
echo "eula=true" > eula.txt

# ---- server.properties ----
cat > server.properties <<EOF
motd=Serveur $SERVER_NAME
view-distance=10
level-type=$WORLD_TYPE
level-seed=$SEED
enable-command-block=true
EOF


echo "[DONE] Serveur $SERVER_NAME créé avec succès."