// components/Header.js

import { useState } from "react";
import { Bell, Heart, Menu, Newspaper, ShieldAlert, User } from "lucide-react";
import Sidebar from "./Menu";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size: number }>;
};

// Itens de navegação traduzidos
const navItems = [
  { name: "Notícias", icon: Newspaper, href: "/news" },
  { name: "Locais de Doação", icon: Heart, href: "/locations-donations" },
  { name: "Locais Vulneráveis", icon: ShieldAlert, href: "#vulnerability" },
] as NavItem[];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="sticky left-0 top-0 shadow-[0px_10px_50px_#000]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        navItems={navItems}
      />

      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-zinc-800 px-4 shadow-md">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center justify-center gap-3 rounded-md px-3 py-1.5 w-1/3">
          <h1 className="text-emerald-400 font-bold">DevJohnny</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-md p-1 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100">
            <Bell size={20} />
          </button>
          <button className="rounded-full bg-zinc-700 p-1 text-zinc-300 hover:bg-zinc-600">
            <User size={20} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
