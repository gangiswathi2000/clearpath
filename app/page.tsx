"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Scale, ShieldCheck, Award, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      
      // Store the initial query so the target module can use it
      if (typeof window !== "undefined") {
        sessionStorage.setItem("initialQuery", query);
      }
      
      if (data.route) {
        router.push(data.route);
      } else {
        router.push("/findpath");
      }
    } catch (error) {
      console.error(error);
      router.push("/findpath"); // fallback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center p-4 md:p-8 font-sans">
      <main className="max-w-5xl w-full flex-1 flex flex-col items-center justify-center space-y-12 md:space-y-16 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 w-full max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            ClearPath
          </h1>
          <p className="text-xl md:text-2xl text-slate-300">
            Your clear path to every benefit you've earned.
          </p>
          
          <form onSubmit={handleSearch} className="relative mt-12 max-w-2xl mx-auto">
            <div className="relative flex items-center group">
              <Search className="absolute left-6 text-slate-400 w-6 h-6 group-focus-within:text-[#F59E0B] transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your situation... (e.g. 'I'm a student making $1200/mo')"
                className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-full py-5 pl-16 pr-36 text-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all shadow-lg placeholder:text-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute right-2 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-full py-3 px-6 font-semibold transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? "Routing..." : "Find Help"}
              </button>
            </div>
          </form>
        </div>

        {/* 4 Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
          {/* FindPath */}
          <button 
            onClick={() => router.push('/findpath')}
            className="flex flex-col items-start p-8 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-[#F59E0B]/50 rounded-3xl transition-all duration-300 text-left group shadow-lg"
          >
            <div className="bg-slate-700/50 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
              FindPath <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-[#F59E0B]" />
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Find programs for me. Describe your situation and discover what you qualify for instantly.
            </p>
          </button>

          {/* AppealBot */}
          <button 
            onClick={() => router.push('/appealbot')}
            className="flex flex-col items-start p-8 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-400/50 rounded-3xl transition-all duration-300 text-left group shadow-lg"
          >
            <div className="bg-slate-700/50 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Scale className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
              AppealBot <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-blue-400" />
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Got denied? Fight back. Upload your denial letter and generate a formal appeal in seconds.
            </p>
          </button>

          {/* ProofBot */}
          <button 
            onClick={() => router.push('/proofbot')}
            className="flex flex-col items-start p-8 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-emerald-400/50 rounded-3xl transition-all duration-300 text-left group shadow-lg"
          >
            <div className="bg-slate-700/50 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
              ProofBot <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-emerald-400" />
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Applying for the first time? Validate your documents with AI before you submit them.
            </p>
          </button>

          {/* VetPath */}
          <button 
            onClick={() => router.push('/vetpath')}
            className="flex flex-col items-start p-8 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-purple-400/50 rounded-3xl transition-all duration-300 text-left group shadow-lg"
          >
            <div className="bg-slate-700/50 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
              VetPath <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-purple-400" />
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Are you a veteran? Discover hidden benefits and automatically draft your VA claim.
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
