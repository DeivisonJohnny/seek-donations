import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";

export default class Scheduler {
  constructor() {
    this.startCron();
  }

  private startCron() {
    cron.schedule("*/1 * * * *", async () => {
      console.log("");
      console.log("######################################");
      console.log("#                                    #");
      console.log("# Running scheduler every 1 minute   #");
      console.log("#                                    #");
      console.log("######################################");
      console.log("");

      // Coloque aqui sua lógica do cron
    });

    console.log("Cron agendado.");
  }

  static handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    new Scheduler(); // ✅ aqui o cron é iniciado

    try {
      return res.status(200).json({ data: "Scheduler started", status: 200 });
    } catch (error) {
      console.error("Erro no scheduler:", error);
      return res
        .status(500)
        .json({ error: (error as Error).message, status: 500 });
    }
  }
}
