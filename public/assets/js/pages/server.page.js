import { ServersAPI } from "../api/servers.api.js";

// ============================
// === INITIALISATION PAGE ===
// ============================

export function initServerPage()
{
    const nom = getNameFromURL();

    afficherNom(nom);
    chargerInfos(nom);
    initBoutons(nom);
}

// ============================
// === RÉCUPÉRATION PARAM ===
// ============================

function getNameFromURL()
{
    const url = new URL(window.location.href);
    return url.searchParams.get("name");
}

// ============================
// === TITRE PAGE ===
// ============================

function afficherNom(nom)
{
    const t = document.getElementById("server-title");
    t.innerText = "Serveur : " + nom;
}

// ============================
// === CHARGEMENT DES INFOS ===
// ============================

async function chargerInfos(nom)
{
    const infos = await fetchInfos(nom);
    console.log(infos);

    if (!infos)
    {
        alert("Impossible de charger les informations du serveur.");
        return;
    }

    afficherInfos(infos);
}

async function fetchInfos(nom)
{
    try
    {
        const url =
            "https://veltays.be/api/server-info/"
            + nom;

        const res = await fetch(url);
        return await res.json();
    }
    catch (err)
    {
        console.error(err);
        return null;
    }
}

function afficherInfos(infos)
{
    const d = infos.data;

    document.getElementById("info-name").innerText   = d.name;
    document.getElementById("info-version").innerText= d.version;
    document.getElementById("info-ram").innerText    = d.ram + " Go";
    document.getElementById("info-type").innerText   = d.type;
    document.getElementById("info-world").innerText  = d.worldType;
}


// ============================
// === BOUTONS ===
// ============================

function initBoutons(nom)
{
    document.getElementById("btn-start").onclick = () => actionStart(nom);
    document.getElementById("btn-stop").onclick  = () => actionStop(nom);
    document.getElementById("btn-console").onclick = () => ouvrirConsole(nom);
}

// ============================
// === ACTIONS ===
// ============================

async function actionStart(nom)
{
    try
    {
        await ServersAPI.start(nom);
        alert("Serveur démarré !");
    }
    catch (err)
    {
        console.error(err);
        alert("Erreur lors du démarrage.");
    }
}

async function actionStop(nom)
{
    try
    {
        await ServersAPI.stop(nom);
        alert("Serveur arrêté !");
    }
    catch (err)
    {
        console.error(err);
        alert("Erreur lors de l'arrêt.");
    }
}

function ouvrirConsole(nom)
{
    window.location.href = "/console.html?name=" + nom;
}

// ============================
// === AUTO-INIT ===
// ============================

initServerPage();
