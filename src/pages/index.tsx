import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Find Donations <span className="text-rose-500">That Matter</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-xl mx-auto">
              Connect with causes that need your support. Our platform helps you
              discover and contribute to meaningful donation opportunities.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <button className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all">
              <Link href="/dashboard">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search Donations</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </button>
            <p className="text-zinc-500 text-sm">
              Join thousands of donors making a difference every day
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Deivison Johnny - Devjohnny. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
