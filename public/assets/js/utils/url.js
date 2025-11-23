// ========================================
// === URL HELPERS (utils/urls.js) ========
// ========================================

/**
 * Retourne les paramètres de l’URL courante.
 * Exemple : getParam("name")
 */
export function getParam(key) {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
}

/**
 * Construit une URL vers une autre page avec des paramètres.
 * Exemple :
 *   buildURL("/console.html", { name: "server1" })
 */
export function buildURL(path, params = {}) {
    const url = new URL(path, window.location.origin);

    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
    }

    return url.toString();
}
