import ApiGemini from "@/service/GeminiApi";
import Prisma from "@/service/Prisma";
import { MODEL_DEFAULT_GEMINI, PROMPTS } from "@/utils/Contants";
import { GenerateContentResponse } from "@google/genai";
import { NextApiRequest, NextApiResponse } from "next";

export default class GeminiController {
  static async newsFetchUpdate(req: NextApiRequest, res: NextApiResponse) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const usage = await Prisma.geminiUsage.findFirst({
        where: { createdAt: { gte: startOfDay, lte: endOfDay } },
        select: { tokenCount: true },
      });

      if (usage && usage?.tokenCount > 1_000_000)
        return res
          .status(412)
          .json({ message: "Chegou ao limite de tokens diários" });

      const data: GenerateContentResponse = await ApiGemini.generateContent({
        model: MODEL_DEFAULT_GEMINI,
        contents: PROMPTS.FETCH_NEWS,
      });

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!data || !text) {
        console.log("Falha ao receber dados da resposta da api");
        return res.status(412).end();
      }

      return res.status(200).json({ data: text });
    } catch (error) {
      console.log(error);
    }
  }
}
