import { connectWS } from "../utils/ws.js";

export function initConsolePage()
{
    const nom = getName();
    document.getElementById("title").innerText = nom;

    const ws = connectWS("/ws/console");

    setupWS(ws);
    setupCommandSender(ws);
}

function getName()
{
    const url = new URL(window.location.href);
    return url.searchParams.get("name");
}

function setupWS(ws)
{
    ws.onmessage = (e) =>
    {
        const d = JSON.parse(e.data);

        if (d.type === "console" || d.type === "info")
        {
            print(d.msg);
        }
    };
}

function print(msg)
{
    const c = document.getElementById("console");
    c.value += msg + "\n";
    c.scrollTop = c.scrollHeight;
}

/* ======================================
   ENVOI DE COMMANDES AU SERVEUR
   ====================================== */

function setupCommandSender(ws)
{
    const input = document.getElementById("cmd-input");
    const btn = document.getElementById("cmd-send");

    // --- Bouton cliquer ---
    btn.onclick = () => sendCmd(ws, input);

    // --- Entrée (touche Enter) ---
    input.addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter")
        {
            sendCmd(ws, input);
        }
    });
}

function sendCmd(ws, input)
{
    const cmd = input.value.trim();
    if (!cmd) return;

    ws.send(JSON.stringify({
        type: "cmd",
        cmd: cmd,
        server: getName()
    }));

    print("> " + cmd); // local echo
    input.value = "";
}

initConsolePage();