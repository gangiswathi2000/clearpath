import Link from 'next/link';
import { Map } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  return (
    <nav className="bg-[#0F172A] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Map className="w-7 h-7 text-[#F59E0B]" /> ClearPath
        </Link>
        <div className="flex gap-6 items-center">
          <div className="pl-4 border-l border-gray-700">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
