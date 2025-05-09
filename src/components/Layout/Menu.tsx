// components/Sidebar.js
import { FC } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size: number }>;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}

const Sidebar: FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  navItems,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-[100_!important] w-64 bg-zinc-800 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-700">
        <Link
          href={"/dashboard"}
          className="text-xl font-bold text-emerald-400"
          onClick={() => setIsSidebarOpen(false)}
        >
          Dashboard
        </Link>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-emerald-400 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
