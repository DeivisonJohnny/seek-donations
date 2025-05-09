"use client";
import Link from "next/link";
import { Newspaper, Heart, ShieldAlert } from "lucide-react";

export default function Dashboard() {
  const navItems = [
    { name: "News pages", icon: Newspaper, href: "/news" },
    { name: "Donation sites", icon: Heart, href: "/locations-donations" },
    { name: "Vulnerability sites", icon: ShieldAlert, href: "#vulnerability" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6">
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">Overview</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-6 shadow-md hover:bg-zinc-700 transition-colors border border-zinc-700 hover:border-emerald-500/50"
              >
                <div className="mb-4 rounded-full bg-zinc-700 p-3 text-emerald-400">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-medium text-zinc-100">
                  {item.name}
                </h3>
                <p className="mt-2 text-center text-sm text-zinc-400">
                  Access {item.name.toLowerCase()} and related information
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-zinc-800 p-6 border border-zinc-700">
            <h3 className="mb-4 text-xl font-medium text-zinc-100">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-md p-3 hover:bg-zinc-700/50"
                >
                  <div className="rounded-full bg-zinc-700 p-2 text-emerald-400">
                    {(() => {
                      const Icon = navItems[i % 3].icon;
                      return <Icon size={16} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      New {navItems[i % 3].name.toLowerCase().slice(0, -1)}{" "}
                      added
                    </p>
                    <p className="text-xs text-zinc-400">
                      {i} hour{i !== 1 ? "s" : ""} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
