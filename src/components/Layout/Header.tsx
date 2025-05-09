// components/Header.js

import { useState } from "react";
import { Bell, Heart, Menu, Newspaper, ShieldAlert, User } from "lucide-react";
import Sidebar from "./Menu";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size: number }>; // Aqui ajustamos a tipagem
};

const navItems = [
  { name: "News pages", icon: Newspaper, href: "/news" },
  { name: "Donation sites", icon: Heart, href: "#donation" },
  { name: "Vulnerability sites", icon: ShieldAlert, href: "#vulnerability" },
] as NavItem[];
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        navItems={navItems}
      />

      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-zinc-800 px-4 shadow-md">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 md:hidden">
          <h1 className="text-lg font-bold text-emerald-400">Dashboard</h1>
        </div>

        <div className="hidden md:flex items-center gap-3 rounded-md bg-zinc-700 px-3 py-1.5 w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-400"
          />
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
