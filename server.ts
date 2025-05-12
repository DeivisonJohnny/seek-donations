import express, { Request, Response } from "express";
import next from "next";
import axios from "axios";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);

  // Opcional: inicialização do Socket.IO, se necessário
  const io = new SocketIOServer(httpServer);

  // Scheduler
  const runScheduler = async (): Promise<void> => {
    try {
      await axios.post(
        `${BASE_URL}/api/services/scheduler`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Erro ao executar scheduler:", error);
    }
  };

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const BASE_PORT = parseInt(process.env.BASE_PORT || "3000", 10);
  httpServer.listen(BASE_PORT, () => {
    console.log(`Server is running on http://localhost:${BASE_PORT}`);
    runScheduler();
  });
});
