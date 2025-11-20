export function connectWS(path)
{
    const host = window.location.hostname;
    const url = "ws://" + host + ":3001" + path;

    return new WebSocket(url);
}