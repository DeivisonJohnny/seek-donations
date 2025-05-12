"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import LocationsDonationsApi, {
  LocationsDonationsType,
} from "@/service/LocationsDonationsApi";
import Utils from "@/utils/utils";

export default function DonationLocations() {
  // Dados simulados para os locais de doação
  const [locations, setLocations] = useState<LocationsDonationsType[]>([]);

  async function insertData() {
    const location = {
      name: "Hapvida",
      address: "Rua Jose Cavalcante, 54",
      city: "Belo Horizonte",
      url: "https://instagram.com.br",
    } as LocationsDonationsType;

    try {
      await LocationsDonationsApi.create(location);
    } catch (error) {
      console.log(error);
    }
  }

  async function listData() {
    try {
      const data: LocationsDonationsType[] = await LocationsDonationsApi.list();
      setLocations(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    insertData();
    listData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Filtra locais com base na pesquisa
  const filteredLocations = locations.filter(
    (location: LocationsDonationsType) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.url.toLowerCase().includes(searchQuery.toLowerCase())
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
            href={location.url}
            target="_blank"
            key={location.id}
            className="block"
          >
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden hover:border-emerald-400 transition-all duration-200 h-full">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-medium text-zinc-100">
                    {location.name}
                  </h2>
                </div>

                <div className="flex items-start mb-3">
                  <MapPin className="text-emerald-400 mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-300">{location.address}</p>
                    <p className="text-sm text-zinc-400">{location.city}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-zinc-400 mb-1.5">
                    Causa da doação:
                  </p>
                  <p className="text-[14px]  ">
                    Crianças desabrigadas no interior de São Paulo
                  </p>
                </div>
                <a
                  href={location.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Fazer doação <ExternalLink className="ml-1 h-4 w-4" />
                </a>

                <div className="text-xs text-zinc-500 mt-3">
                  Atualizado {Utils.formatData(location.createAt as string)}
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
