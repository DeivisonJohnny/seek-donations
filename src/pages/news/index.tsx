"use client";

import { useState, useEffect } from "react";
import { Search, Clock, ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  publishedAt: string;
}

export default function NewsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Novo Avanço na Computação Quântica",
      description:
        "Cientistas alcançaram um grande marco na computação quântica, demonstrando coerência quântica sustentada por mais de 10 minutos.",
      url: "https://example.com/quantum-computing",
      category: "Tecnologia",
      publishedAt: "há 2 horas",
    },
    {
      id: 2,
      title: "Cúpula do Clima Global Alcança Acordo Histórico",
      description:
        "Líderes mundiais concordaram com novas metas ambiciosas para reduzir as emissões de carbono em 50% até 2030.",
      url: "https://example.com/climate-summit",
      category: "Meio Ambiente",
      publishedAt: "há 5 horas",
    },
    {
      id: 3,
      title: "Mercados de Ações Batem Recorde Histórico",
      description:
        "Principais índices atingiram níveis recordes hoje, impulsionados por fortes relatórios de lucros e dados econômicos positivos.",
      url: "https://example.com/stock-markets",
      category: "Finanças",
      publishedAt: "há 1 hora",
    },
    {
      id: 4,
      title:
        "Novo Modelo de IA Pode Prever Estruturas de Proteínas com 98% de Precisão",
      description:
        "Pesquisadores desenvolveram um sistema de IA que pode prever estruturas complexas de proteínas com precisão sem precedentes, potencialmente revolucionando a descoberta de medicamentos.",
      url: "https://example.com/ai-protein",
      category: "Ciência",
      publishedAt: "há 3 horas",
    },
    {
      id: 5,
      title: "Empresa de Turismo Espacial Anuncia Primeira Missão Lunar Civil",
      description:
        "Uma empresa privada de exploração espacial revelou planos para enviar civis em uma viagem ao redor da lua até 2025.",
      url: "https://example.com/lunar-mission",
      category: "Espaço",
      publishedAt: "há 6 horas",
    },
  ]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700/50 transition-colors border border-zinc-700 hover:border-emerald-500"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-700 text-emerald-400 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {item.publishedAt}
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
