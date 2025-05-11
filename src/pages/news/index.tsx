"use client";

import { useState, useEffect } from "react";
import { Search, Clock, ExternalLink } from "lucide-react";
import NewsApi, { NewsItem } from "@/service/NewsApi";
import Utils from "@/utils/utils";

export default function NewsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  async function fetchData() {
    try {
      const data: NewsItem[] = await NewsApi.listAll();

      setNewsItems(data);

      // const dataInsert = {
      //   title: "Rio grande do sul",
      //   description:
      //     "Rio grande do sul sofre com grande chuva e causa demolições",
      //   category: { name: "Alagamentos urbanos" },
      //   url: "https://instagram.com/deivisonjohnny",
      // } as NewsItem;

      // const createNews = await NewsApi.create(dataInsert);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const filteredNews = newsItems?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 z-[1_!important]">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">
            Notícias de Hoje
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-96">
              <input
                type="text"
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg block w-full pl-2.5 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center text-zinc-400">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">
                Última atualização: {currentDateTime}
              </span>
            </div>
          </div>
        </header>

        <main>
          <div className="grid gap-6">
            {newsItems.length > 0 ? (
              filteredNews?.map((item) => (
                <article
                  key={item.id}
                  className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700/50 transition-colors border border-zinc-700 hover:border-emerald-500"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-700 text-emerald-400 rounded-full">
                      {item.category?.name}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {Utils.formatData(item.createAt)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-zinc-100">
                    {item.title}
                  </h2>
                  <p className="text-zinc-300 mb-4">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Ler artigo completo{" "}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </article>
              ))
            ) : (
              <div className="text-center py-10 bg-zinc-800 rounded-lg">
                <p className="text-zinc-400">
                  Nenhuma notícia encontrada para sua busca.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
