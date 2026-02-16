import React, { useState } from 'react';
import { Menu, X, Search, Bell, Flame } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/95 border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded">
              <Flame className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter oswald italic">
              COMBAT <span className="text-red-600">FIEND</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 font-semibold uppercase tracking-widest text-sm">
              <a href="#" className="hover:text-red-600 transition-colors text-red-600">News</a>
              <a href="#" className="hover:text-red-600 transition-colors">MMA</a>
              <a href="#" className="hover:text-red-600 transition-colors">Boxing</a>
              <a href="#" className="hover:text-red-600 transition-colors">Grappling</a>
              <a href="#" className="hover:text-red-600 transition-colors">Analysis</a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-black"></span>
            </button>
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-sm font-bold oswald">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600">News</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600">MMA</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600">Boxing</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600">Grappling</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600">Fiend AI</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
