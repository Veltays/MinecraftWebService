import { ServersAPI } from "../api/servers.api.js";

// ============================
// === INITIALISATION PAGE ===
// ============================

export function initCreatePage() {
    const boutonCreation = document.getElementById("btn-create");

    boutonCreation.onclick = async () => {
        const data = recupererFormulaire();
        const serveurCree = await creerServeur(data);

        if (serveurCree) {
            redirectionAccueil();
        }
    };

    // Charger les versions au chargement de la page
    LoadAllVersions();
}

// ============================
// === RÉCUPÉRATION FORM ===
// ============================

function recupererFormulaire() {
    return {
        name: document.getElementById("name").value,
        version: document.getElementById("version").value,
        ram: document.getElementById("ram").value,
        type: document.getElementById("type").value,
        worldType: document.getElementById("worldType").value
    };
}

// ============================
// === APPEL API CREATION ===
// ============================

async function creerServeur(data) {
    try {
        await ServersAPI.create(data);
        return true;
    } catch (error) {
        console.error(error);
        alert("Erreur lors de la création du serveur.");
        return false;
    }
}

// ============================
// === REDIRECTION ===
// ============================

function redirectionAccueil() {
    window.location.href = "index.html";
}

// ============================
// === CHARGER VERSIONS MC ===
// ============================
async function LoadAllVersions() {
    const versionSelect = document.getElementById("version");
    const typeSelect = document.getElementById("type");

    // On recharge quand le type change
    typeSelect.addEventListener("change", () => {
        loadVersionsByType(typeSelect.value);
    });

    // Chargement initial
    loadVersionsByType(typeSelect.value);
}


async function loadVersionsByType(type) {
    const versionSelect = document.getElementById("version");
    versionSelect.innerHTML = ""; // reset

    try {
        const resp = await fetch("https://piston-meta.mojang.com/mc/game/version_manifest.json");
        if (!resp.ok) throw new Error("Impossible de récupérer les versions MC");

        const data = await resp.json();
        const versions = data.versions;

        let filtered = [];

        if (type === "snapshot") {
            // === Snapshots uniquement ===
            filtered = versions.filter(v => v.type === "snapshot");
        } else {
            // === Releases uniquement ===
            filtered = versions.filter(v => v.type === "release");
        }

        // Ajout dans le select
        filtered.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = v.id;
            versionSelect.appendChild(opt);
        });

    } catch (error) {
        console.error("Erreur versions :", error);

        const fallback = ["1.21.1", "1.20.4"];
        fallback.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v;
            opt.textContent = v;
            versionSelect.appendChild(opt);
        });
    }
}

// ============================
// === AUTO-LAUNCH INIT ===
// ============================

initCreatePage();
