"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

// Tipos para os locais de doação
type DonationLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  acceptingItems: string[];
  lastUpdated: string;
};

export default function DonationLocations() {
  // Dados simulados para os locais de doação
  const [locations, setLocations] = useState<DonationLocation[]>([
    {
      id: "1",
      name: "Centro de Ação Comunitária",
      address: "Rua Principal, 123",
      city: "Portland, OR",
      distance: "0,8 milhas",
      acceptingItems: [
        "Roupas",
        "Alimentos não perecíveis",
        "Produtos de higiene",
      ],
      lastUpdated: "há 2 dias",
    },
    {
      id: "2",
      name: "Abrigo Esperança",
      address: "Avenida dos Pinheiros, 456",
      city: "Portland, OR",
      distance: "1,2 milhas",
      acceptingItems: [
        "Cobertores",
        "Roupas de inverno",
        "Alimentos enlatados",
      ],
      lastUpdated: "há 1 dia",
    },
    {
      id: "3",
      name: "Fundação Mãos Amigas",
      address: "Boulevard do Carvalho, 789",
      city: "Portland, OR",
      distance: "2,5 milhas",
      acceptingItems: ["Livros", "Brinquedos", "Material escolar"],
      lastUpdated: "há 5 horas",
    },
    {
      id: "4",
      name: "Centro de Doações Goodwill",
      address: "Alameda Caridade, 101",
      city: "Portland, OR",
      distance: "3,1 milhas",
      acceptingItems: ["Móveis", "Eletrônicos", "Itens domésticos"],
      lastUpdated: "agora mesmo",
    },
    {
      id: "5",
      name: "Brechó Segunda Chance",
      address: "Rua da Esperança, 202",
      city: "Portland, OR",
      distance: "4,7 milhas",
      acceptingItems: ["Roupas", "Sapatos", "Acessórios"],
      lastUpdated: "há 3 dias",
    },
    {
      id: "6",
      name: "Banco de Alimentos Noroeste",
      address: "Estrada da Solidariedade, 303",
      city: "Portland, OR",
      distance: "5,3 milhas",
      acceptingItems: [
        "Alimentos não perecíveis",
        "Fórmula infantil",
        "Ração para animais",
      ],
      lastUpdated: "ontem",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filtra locais com base na pesquisa
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.acceptingItems.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Locais de Doação
        </h1>
        <p className="text-zinc-400">
          Encontre lugares para doar itens na sua região
        </p>
      </header>

      {/* Seção de busca e filtro */}
      <div className="mb-6">
        <div>
          <input
            type="text"
            placeholder="Pesquisar locais ou itens..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 pl-4 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grade de locais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <Link
            href={`/location/${location.id}`}
            key={location.id}
            className="block"
          >
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden hover:border-emerald-400 transition-all duration-200 h-full">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-medium text-zinc-100">
                    {location.name}
                  </h2>
                  <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded-full">
                    {location.distance}
                  </span>
                </div>

                <div className="flex items-start mb-3">
                  <MapPin className="text-emerald-400 mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-300">{location.address}</p>
                    <p className="text-sm text-zinc-400">{location.city}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-zinc-400 mb-1.5">Aceitando:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {location.acceptingItems.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-zinc-700 text-emerald-300 px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-zinc-500 mt-3">
                  Atualizado {location.lastUpdated}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400">
            Nenhum local de doação encontrado correspondente à sua pesquisa.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 text-emerald-400 hover:text-emerald-300"
          >
            Limpar pesquisa
          </button>
        </div>
      )}
    </div>
  );
}
