import { NewsItem } from "@/service/NewsApi";
import Prisma from "@/service/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default class NewsController {
  static async list(req: NextApiRequest, res: NextApiResponse) {
    const news = await Prisma.news.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { createAt: "desc" },
    });

    return res.json(news);
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    const dataNews = req.body as NewsItem;

    const newData = await Prisma.news.create({
      data: {
        title: dataNews.title,
        description: dataNews.description,
        url: dataNews.url,
        category: {
          connectOrCreate: {
            where: {
              id: dataNews.category?.name?.toLowerCase().replace(/\s+/g, ""),
            },
            create: {
              id: dataNews.category?.name?.toLowerCase().replace(/\s+/g, ""),
              name: dataNews.category?.name as string,
            },
          },
        },
      },
    });
    return res.json(newData);
  }
}
