import Api from ".";

export type NewsType = {
  id?: string;
  title: string;
  description: string;
  url: string;
  category?: { name: string };
  categoryId: string;
  createdAt?: string;
};

export default class NewsApi {
  static listAll(): Promise<NewsType[]> {
    return Api.get("news");
  }

  static async create(data: NewsType) {
    return Api.post("/news", data);
  }
}
