import { createServer } from "node:http";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";
import { buildDashboardPayload } from "./lib/dashboard";

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

async function main() {
  // Create the HTTP server first so we can pass it to Next.js.
  // This lets Next.js attach its own upgrade listeners (Turbopack HMR)
  // to the same server without conflicting with ours.
  const httpServer = createServer();

  const app = next({ dev, hostname: "localhost", port, httpServer });
  const handle = app.getRequestHandler();

  await app.prepare();

  httpServer.on("request", (req, res) => {
    handle(req, res);
  });

  // WebSocket server in no-server mode — we hand it upgrades manually
  // so we control which paths are ours vs Next.js HMR paths.
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on("upgrade", (req, socket, head) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);

    if (url.pathname === "/api/ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
      // All other paths (e.g. Next.js HMR /_next/webpack-hmr) fall through
      // to Next.js's own upgrade listeners attached via httpServer above.
    }
  });

  wss.on("connection", (ws) => {
    // Send a snapshot immediately so the client doesn't wait 3 s.
    ws.send(JSON.stringify(buildDashboardPayload()));
  });

  // Broadcast to every connected client every 3 seconds.
  setInterval(() => {
    if (wss.clients.size === 0) return;
    const payload = JSON.stringify(buildDashboardPayload());
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }, 3000);

  httpServer.listen(port, () => {
    console.log(`▲ Next.js + WebSocket ready → http://localhost:${port}`);
    console.log(`  WebSocket endpoint         → ws://localhost:${port}/api/ws`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
