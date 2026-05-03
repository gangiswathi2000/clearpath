"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft } from "lucide-react";

export default function FindPathPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialQuery = sessionStorage.getItem("initialQuery");
    if (initialQuery) {
      sessionStorage.removeItem("initialQuery");
      handleSend(initialQuery);
    } else {
      setMessages([{
        role: "assistant",
        content: "Hi! I'm your FindPath assistant. Describe your situation (income, household size, location, etc.) and I'll find programs you qualify for."
      }]);
    }
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/findpath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.response || "Failed to fetch from Gemini API");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "Sorry, I couldn't process that request." }
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error.message || "Sorry, there was an error processing your request." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans">
      <header className="p-4 border-b border-slate-800 flex items-center">
        <button onClick={() => router.push("/")} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="ml-4 text-xl font-bold">FindPath</h1>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-md ${msg.role === "user" ? "bg-[#F59E0B] text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none leading-relaxed"}`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl bg-slate-800 text-slate-200 rounded-bl-none flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 relative pb-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-center group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your situation..."
              className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all shadow-lg placeholder:text-slate-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-full p-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
