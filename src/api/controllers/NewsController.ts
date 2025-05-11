import Prisma from "@/service/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default class NewsController {
  static async list(req: NextApiRequest, res: NextApiResponse) {
    const news = await Prisma.news.findMany({
      include: { category: { select: { name: true } } },
    });

    return res.json(news);
  }
}
