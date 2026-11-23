"use client";

import React from "react";
import { Film, Clapperboard, Sparkles, Search, SlidersHorizontal } from "lucide-react";
import { GENRES_LIST } from "@/data/movies";

interface HeaderProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedGenre,
  onSelectGenre,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all duration-300">
      {/* Top celeste accent brand strip */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
            <span>Filmy • El Blog de Cine & Estética Visual</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-sky-100">
            <span>Análisis Cuadro a Cuadro</span>
            <span>•</span>
            <span>100% Público & Sin Registro</span>
            <span>•</span>
            <span className="font-semibold text-white">Vercel Ready</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onSelectGenre("Todos")}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <Clapperboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                    Filmy
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                </div>
                <p className="text-xs font-semibold text-sky-700 tracking-wide uppercase">
                  Crítica & Perspectiva de Cine
                </p>
              </div>
            </div>

            {/* Quick stats on mobile */}
            <div className="md:hidden flex items-center text-xs font-semibold text-slate-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              <Film className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
              <span>{totalCount} Reseñas</span>
            </div>
          </div>

          {/* Search bar with clear high contrast */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-600 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar película, director, autor..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder-slate-500 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all duration-200 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center text-xs font-semibold text-slate-800 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-xl border border-sky-200 transition-colors">
              <Film className="w-4 h-4 text-sky-600 mr-2" />
              <span>{totalCount} {totalCount === 1 ? "Artículo" : "Artículos"}</span>
            </div>
          </div>
        </div>

        {/* Movie Genres Menu (as requested: "un menú con los géneros de las películas") */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
              <span>Géneros:</span>
            </div>
            
            <nav className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none py-0.5">
              {GENRES_LIST.map((genre) => {
                const isActive = selectedGenre === genre;
                return (
                  <button
                    key={genre}
                    onClick={() => onSelectGenre(genre)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md shadow-sky-500/30 scale-102"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200/60"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
