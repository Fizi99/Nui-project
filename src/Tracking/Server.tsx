// File: server.ts
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5173 });

console.log("WebSocket server started on ws://localhost:5173");

wss.on('connection', (ws) => {
    console.log("New device connected.");

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        console.log("Received data:", data);

        // Broadcast to all connected devices (optional)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        console.log("Device disconnected.");
    });
});
