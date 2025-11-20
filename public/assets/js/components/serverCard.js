export function ServerCard(name)
{
    const html =
        `
        <div class="server-card">
            <h3>${name}</h3>

            <div class="server-actions">
                <a href="/server.html?name=${name}">
                    <button class="btn-open">
                        Ouvrir
                    </button>
                    <button class="btn-delete">
                        Supprimer
                    </button>
                </a>
            </div>
        </div>
        `;

    return html;
}