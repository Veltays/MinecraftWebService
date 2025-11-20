export function ServerCard(server)
{
    const { name, isRunning } = server;
    const statusClass = isRunning ? 'status-running' : 'status-stopped';
    const statusText = isRunning ? 'Démarré' : 'Arrêté';

    return `
        <div class="server-card">
            <h3>${name} 
                <span class="server-status ${statusClass}">
                    ${statusText}
                </span>
            </h3>

            <div class="server-actions">
                <button data-action="start" data-name="${name}">
                    Démarrer
                </button>
                <button data-action="stop" data-name="${name}">
                    Arrêter
                </button>
                <a href="/server.html?name=${name}">
                    <button class="btn-open">
                        Ouvrir
                    </button>
                </a>
            <button class="btn-delete" data-action="delete" data-name="${name}">
                Supprimer
            </button>
            </div>
        </div>
    `;
}