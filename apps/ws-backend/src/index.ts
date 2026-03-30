import dotenv from "dotenv"
import { fileURLToPath } from "node:url"

dotenv.config({
    path: fileURLToPath(new URL("../../../packages/db/.env", import.meta.url)),
})

const { prisma } = await import("@repo/db")

Bun.serve({
    port: 8081,
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message(ws, message) {
            prisma.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message);
        },
    },
});
