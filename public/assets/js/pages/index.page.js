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
    console.log(servers)

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
        .map((server) => ServerCard(server))
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
        const btn = event.target; // Récupère l'élément cliqué

        const aucuneAction =
            !btn.dataset ||
            !btn.dataset.action; // Vérifie si ce n'est pas un bouton d'action

        if (aucuneAction)
        {
            return;
        }

        const action = btn.dataset.action; // 'start' ou 'stop'
        const name = btn.dataset.name;     // Nom du serveur

        if (action === "start")
        {
            await ServersAPI.start(name);
        }

        // L'appel API pour fermer le serveur est ici, comme demandé
        if (action === "stop")
        {
            await ServersAPI.stop(name);
        }
        if (action === "delete") {

            const input = prompt(
                `Pour supprimer le serveur "${name}", tapez son nom :`
            );

            if (!input) {
                alert("Suppression annulée.");
                return;
            }

            if (input !== name) {
                alert("Nom incorrect. Le serveur n’a pas été supprimé.");
                return;
            }

            // Appeler l’API
            await ServersAPI.delete(name);

            alert(`Serveur "${name}" supprimé ✔`);
            await loadHomePage();
        }

        alert("Opération effectuée !");

        // Rafraîchir la page pour mettre à jour le statut (Vert/Rouge)
        await loadHomePage();
    });
}

// ============================
// === AUTO-LAUNCH INIT ===
// ============================

initHomePage();
