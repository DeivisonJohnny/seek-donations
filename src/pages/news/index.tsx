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
      title: "New Breakthrough in Quantum Computing",
      description:
        "Scientists have achieved a major milestone in quantum computing, demonstrating sustained quantum coherence for over 10 minutes.",
      url: "https://example.com/quantum-computing",
      category: "Technology",
      publishedAt: "2 hours ago",
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      description:
        "World leaders have agreed on ambitious new targets to reduce carbon emissions by 50% before 2030.",
      url: "https://example.com/climate-summit",
      category: "Environment",
      publishedAt: "5 hours ago",
    },
    {
      id: 3,
      title: "Stock Markets Hit All-Time High",
      description:
        "Major indices reached record levels today, driven by strong earnings reports and positive economic data.",
      url: "https://example.com/stock-markets",
      category: "Finance",
      publishedAt: "1 hour ago",
    },
    {
      id: 4,
      title: "New AI Model Can Predict Protein Structures with 98% Accuracy",
      description:
        "Researchers have developed an AI system that can predict complex protein structures with unprecedented accuracy, potentially revolutionizing drug discovery.",
      url: "https://example.com/ai-protein",
      category: "Science",
      publishedAt: "3 hours ago",
    },
    {
      id: 5,
      title: "Space Tourism Company Announces First Civilian Lunar Mission",
      description:
        "A private space company has revealed plans to send civilians on a journey around the moon by 2025.",
      url: "https://example.com/lunar-mission",
      category: "Space",
      publishedAt: "6 hours ago",
    },
  ]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

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
            Today's News
          </h1>
          <div className=" flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className=" w-full sm:w-96">
              <input
                type="text"
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg block w-full pl-2.5 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 "
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center text-zinc-400">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Last updated: {currentDateTime}</span>
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
                    Read full article <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </article>
              ))
            ) : (
              <div className="text-center py-10 bg-zinc-800 rounded-lg">
                <p className="text-zinc-400">
                  No news found matching your search.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
