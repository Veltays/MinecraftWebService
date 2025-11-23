// ==========================================
// === SERVERS API (Frontend -> Backend) ===
// ==========================================

const API_BASE = "https://veltays.be/api/servers";

export const ServersAPI =
    {
        // ============================
        // === LISTE DES SERVEURS ===
        // ============================

        async list()
        {
            const url = API_BASE;

            const response = await fetch(url);

            const data = await response.json();

            return data;
        },

        // ============================
        // === CREATION SERVEUR ===
        // ============================

        async create(payload)
        {
            const url = API_BASE + "/create";

            const options =
                {
                    method: "POST",
                    headers:
                        {
                            "Content-Type": "application/json"
                        },
                    body: JSON.stringify(payload)
                };

            const response = await fetch(url, options);

            const data = await response.json();

            return data;
        },

        // ============================
        // === DÉMARRER SERVEUR ===
        // ============================

        async start(name)
        {
            const url =
                API_BASE + "/start/" + name;

            const options =
                {
                    method: "POST"
                };

            const response = await fetch(url, options);

            return response;
        },

        // ============================
        // === STOPPER SERVEUR ===
        // ============================

        async stop(name)
        {
            const url =
                API_BASE + "/stop/" + name;

            const options =
                {
                    method: "POST"
                };

            const response = await fetch(url, options);

            return response;
        },

        // ============================
        // === SUPPRIMER SERVEUR ===
        // ============================

        async delete(name) {
            const url = API_BASE + "/" + name; // Appel à /api/servers/:name

            const options =
                {
                    method: "DELETE" // CORRECTION: Utilisation de fetch avec la méthode DELETE
                };

            const response = await fetch(url, options);

            return response;
        }

    };