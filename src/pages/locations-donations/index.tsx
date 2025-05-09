"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

// Types for our donation locations
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
  // Mock data for donation locations
  const [locations, setLocations] = useState<DonationLocation[]>([
    {
      id: "1",
      name: "Community Outreach Center",
      address: "123 Main Street",
      city: "Portland, OR",
      distance: "0.8 miles",
      acceptingItems: ["Clothing", "Non-perishable food", "Hygiene products"],
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      name: "Hope Shelter",
      address: "456 Pine Avenue",
      city: "Portland, OR",
      distance: "1.2 miles",
      acceptingItems: ["Blankets", "Winter clothing", "Canned goods"],
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "Helping Hands Foundation",
      address: "789 Oak Boulevard",
      city: "Portland, OR",
      distance: "2.5 miles",
      acceptingItems: ["Books", "Toys", "School supplies"],
      lastUpdated: "5 hours ago",
    },
    {
      id: "4",
      name: "Goodwill Donation Center",
      address: "101 Charity Lane",
      city: "Portland, OR",
      distance: "3.1 miles",
      acceptingItems: ["Furniture", "Electronics", "Household items"],
      lastUpdated: "Just now",
    },
    {
      id: "5",
      name: "Second Chance Thrift",
      address: "202 Hope Street",
      city: "Portland, OR",
      distance: "4.7 miles",
      acceptingItems: ["Clothing", "Shoes", "Accessories"],
      lastUpdated: "3 days ago",
    },
    {
      id: "6",
      name: "Food Bank Northwest",
      address: "303 Giving Road",
      city: "Portland, OR",
      distance: "5.3 miles",
      acceptingItems: ["Non-perishable food", "Baby formula", "Pet food"],
      lastUpdated: "Yesterday",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter locations based on search query
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
          Donation Locations
        </h1>
        <p className="text-zinc-400">
          Find places to donate items in your area
        </p>
      </header>

      {/* Search and filter section */}
      <div className="mb-6">
        <div>
          <input
            type="text"
            placeholder="Search locations or items..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 pl-4 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Locations grid */}
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
                  <p className="text-xs text-zinc-400 mb-1.5">Accepting:</p>
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
                  Updated {location.lastUpdated}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400">
            No donation locations found matching your search.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 text-emerald-400 hover:text-emerald-300"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
