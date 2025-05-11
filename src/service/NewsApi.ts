import Api from ".";

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  url: string;
  category: { name: string };
  createAt: string;
};

export default class NewsApi {
  static listAll(): Promise<NewsItem[]> {
    return Api.get("news");
  }
}
