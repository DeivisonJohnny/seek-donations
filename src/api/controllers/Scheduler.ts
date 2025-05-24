import axios from "axios";
import cron from "node-cron";
import type { NextApiRequest, NextApiResponse } from "next";

export default class Scheduler {
  constructor() {
    this.startCron();
  }

  private startCron() {
    cron.schedule("*/30 * * * *", async () => {
      console.log("");
      console.log("######################################");
      console.log("#                                    #");
      console.log("# Running scheduler every 1 minute   #");
      console.log("#                                    #");
      console.log("######################################");
      console.log("");

      try {
        const response = await this.insertNews();
        console.log("✅ News inserted successfully:", response.data);
      } catch (error) {
        console.error("❌ Error inserting news:", (error as Error).message);
      }
    });

    console.log("🕒 Cron agendado para rodar a cada 30 minuto.");
  }

  static handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      new Scheduler(); // Inicia o cron job
      return res
        .status(200)
        .json({ message: "Scheduler started", status: 200 });
    } catch (error) {
      console.error("Erro ao iniciar o scheduler:", error);
      return res
        .status(500)
        .json({ error: (error as Error).message, status: 500 });
    }
  }

  private async insertNews() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/search/news"
      ); // ✅ coloque aqui a URL do seu ambiente de produção se necessário

      return response;
    } catch (error) {
      console.error("Erro na requisição insertNews:", (error as Error).message);
      throw error;
    }
  }
}
