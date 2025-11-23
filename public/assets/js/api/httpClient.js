// ===============================
// === HTTP CLIENT (GLOBAL) =====
// ===============================
//
// Ce client gère automatiquement :
// - http ou https selon window.location
// - /api comme route backend
// - JSON parsing centralisé
//

export const API_BASE = `${window.location.origin}/api`;

async function request(method, path, body = null) {
    const url = API_BASE + path;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // body seulement pour POST / PUT
    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    // Gestion erreur HTTP claire
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} → ${text}`);
    }

    return res.json();
}

export const http = {
    get: (path) => request("GET", path),
    post: (path, body = {}) => request("POST", path, body)
};
