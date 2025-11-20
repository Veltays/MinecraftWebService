import { ServersAPI } from "../api/servers.api.js";
import { ServerCard } from "../components/serverCard.js";

// ============================
// === INITIALISATION PAGE ===
// ============================

export function initHomePage()
{
    loadHomePage();
}

// ============================
// === CHARGEMENT DE LA PAGE ===
// ============================

export async function loadHomePage()
{
    const listElement = document.getElementById("server-list");

    afficherChargement(listElement);

    const servers = await recupererListeServeurs();

    if (servers.length === 0)
    {
        afficherAucunServeur(listElement);
        return;
    }

    afficherServeurs(listElement, servers);

    ajouterListeners(listElement);
}

// ============================
// === FONCTION : LOADER ===
// ============================

function afficherChargement(listElement)
{
    listElement.innerHTML = "<p>Chargement...</p>";
}

// ============================
// === FONCTION : RÉCUPÉRATION API ===
// ============================

async function recupererListeServeurs()
{
    const response = await ServersAPI.list();

    if (!response || !response.data)
    {
        return [];
    }

    return response.data;
}

// ============================
// === FONCTION : AUCUN SERVEUR ===
// ============================

function afficherAucunServeur(listElement)
{
    listElement.innerHTML =
        "<p>Aucun serveur trouvé.</p>";
}

// ============================
// === FONCTION : AFFICHER LES CARDS ===
// ============================

function afficherServeurs(listElement, servers)
{
    listElement.innerHTML = "";

    const htmlCards = servers
        .map((serverName) => ServerCard(serverName))
        .join("");

    listElement.innerHTML = htmlCards;
}

// ============================
// === LISTENERS BOUTONS ===
// ============================

function ajouterListeners(listElement)
{
    listElement.addEventListener("click", async (event) =>
    {
        const btn = event.target;

        const aucuneAction =
            !btn.dataset ||
            !btn.dataset.action;

        if (aucuneAction)
        {
            return;
        }

        const action = btn.dataset.action;
        const name = btn.dataset.name;

        if (action === "start")
        {
            await ServersAPI.start(name);
        }

        if (action === "stop")
        {
            await ServersAPI.stop(name);
        }

        alert("Opération effectuée !");
    });
}

// ============================
// === AUTO-LAUNCH INIT ===
// ============================

initHomePage();
