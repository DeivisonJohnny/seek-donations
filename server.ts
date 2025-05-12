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

  const runScheduler = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/services/scheduler`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ Requisição bem-sucedida!");
      console.log("📦 Resposta:", response.data);
    } catch (error: any) {
      console.error("❌ Erro ao executar scheduler:");
      if (error.response) {
        // Erro retornado pela API (status HTTP fora de 2xx)
        console.error("Status:", error.response.status);
        console.error("Resposta:", error.response.data);
      } else if (error.request) {
        // Requisição feita, mas sem resposta
        console.error("Sem resposta da API:", error.request);
      } else {
        // Erro ao configurar a requisição
        console.error("Erro ao configurar a requisição:", error.message);
      }
    } finally {
      process.exit(0); // Encerra a aplicação após a execução
    }
  };

  server.all("(.*)", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const BASE_PORT_SERVER = parseInt(process.env.BASE_PORT_SERVER || "3001", 10);
  httpServer.listen(BASE_PORT_SERVER, () => {
    console.log(`Server is running on http://localhost:${BASE_PORT_SERVER}`);
    runScheduler();
  });
});
