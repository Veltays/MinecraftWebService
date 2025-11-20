export function connectWS(path)
{
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.host;
    // host = "www.veltays.be" ou "91.86.140.5" ou "localhost:5000"

    const url = `${protocol}://${host}${path}`;

    console.log("WS →", url);

    return new WebSocket(url);
}