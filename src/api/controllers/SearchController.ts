import BraveApi, { SearchBraveResponse } from "@/service/BraveApi";
import { NewsItem } from "@/service/NewsApi";
import Prisma from "@/service/Prisma";
import { QUERY_SEARCH } from "@/utils/Contants";
import Utils from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default class SearchController {
  static async newsFetchUpdated(req: NextApiRequest, res: NextApiResponse) {
    try {
      const searchResponse: SearchBraveResponse = await BraveApi.get(
        "web/search",
        {
          params: {
            q: QUERY_SEARCH.NEWS,
            count: 10,
          },
        }
      );

      if (!searchResponse.data) {
        console.log(
          "Ocorreu um erro inesperado ao fazer pesquisa, será feita outra na proxima execução do agendamento"
        );
        return res.status(412).end();
      }

      const resultsWebSearch = searchResponse.data?.web?.results;

      const newsForInsert: NewsItem[] = resultsWebSearch.map((item) => ({
        title: item.title,
        description: Utils.removeTagHtml(item.description),
        url: item.url,
        categoryId: item.subtype.toLowerCase().replace(/\s+/g, "") as string,
      }));

      const categoryInsert = await Promise.all(
        newsForInsert.map((item, index) =>
          Prisma.category.upsert({
            where: {
              id: item.categoryId,
            },
            update: {},
            create: {
              id: item.categoryId,
              name: resultsWebSearch[index]?.subtype as string,
            },
          })
        )
      );

      if (!categoryInsert) {
        console.log(
          "Erro inesperado ao tentar inserir as categorias de cada resultado"
        );
        return res.status(412).end();
      }

      const responseNews = await Prisma.news.createMany({
        data: newsForInsert,
      });

      return res.status(201).json({ ...responseNews, status: "successful" });
    } catch (error) {
      console.log(
        "Ocorreu um erro inesperado ao fazer pesquisa, será feita outra na proxima execução do agendamento"
      );

      console.log("Erro da tentativa----> ", error);
    }
  }
}
