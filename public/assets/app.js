const API = "http://raspberrypi.local:3001/api/servers";

// List servers
async function loadServers() {
    const res = await fetch(API);
    const servers = await res.json();

    const list = document.getElementById("server-list");
    list.innerHTML = "";

    servers.forEach(name => {
        list.innerHTML += `
            <div class="server-card">
                <h3>${name}</h3>
                <div class="server-actions">
                    <button onclick="startServer('${name}')">Start</button>
                    <button onclick="stopServer('${name}')">Stop</button>
                    <a href="console.html?name=${name}">
                        <button style="background:#008CBA;">Console</button>
                    </a>
                </div>
            </div>
        `;
    });
}

// Create server
async function createServer() {
    console.log("Creating server...");
    const data = {
        name: document.getElementById("name").value,
        version: document.getElementById("version").value,
        ram: document.getElementById("ram").value,
        type: document.getElementById("type").value,
        worldType: document.getElementById("worldType").value
    };

    const res = await fetch(API + "/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const out = await res.json();
    alert("Serveur créé !");
    window.location.href = "index.html";
}

// Start server
async function startServer(name) {
    await fetch(API + "/start/" + name, { method: "POST" });
    alert("Serveur démarré !");
}

// Stop server
async function stopServer(name) {
    await fetch(API + "/stop/" + name, { method: "POST" });
    alert("Serveur arrêté !");
}

// Console WebSocket
function initConsole() {
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");

    document.getElementById("title").innerText = name;

    const ws = new WebSocket("ws://raspberrypi.local:3001/ws/console");

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === "console") {
            const log = document.getElementById("console");
            log.value += data.msg + "\n";
            log.scrollTop = log.scrollHeight;
        }
    };
}
