"use client";

import React from "react";
import { Clapperboard, Heart, Sparkles, Send, Film, ShieldCheck } from "lucide-react";
import { GENRES_LIST } from "@/data/movies";

interface FooterProps {
  onSelectGenre: (genre: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectGenre }) => {
  return (
    <footer className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-sky-900 text-white overflow-hidden border-t-4 border-sky-400">
      {/* Decorative film reel background watermarks */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-sky-500/10 pointer-events-none blur-3xl" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-400/10 pointer-events-none blur-2xl" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-sky-500/40">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white text-sky-700 flex items-center justify-center shadow-lg font-black">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
                Filmy
              </span>
            </div>

            <p className="text-sm text-sky-100 leading-relaxed font-normal">
              El blog cinematográfico especializado en estética visual, fotografía y análisis narrativo escena por escena. Creado por y para amantes del Séptimo Arte.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/40 text-white border border-sky-300/40">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
                <span>Sitio Público • Sin Registro Necesario</span>
              </span>
            </div>
          </div>

          {/* Quick Genres Nav */}
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Film className="w-4 h-4 text-sky-200" />
              <span>Explorar Géneros</span>
            </h4>
            <ul className="space-y-2.5">
              {GENRES_LIST.map((genre) => (
                <li key={genre}>
                  <button
                    onClick={() => {
                      onSelectGenre(genre);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="text-sm text-sky-100 hover:text-white hover:underline transition-colors cursor-pointer flex items-center space-x-2 text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    <span>{genre}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cinema Philosophy / Quote */}
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Manifiesto Filmy</span>
            </h4>
            <div className="p-4 rounded-2xl bg-sky-800/60 border border-sky-400/30 text-sky-100 text-xs leading-relaxed space-y-2">
              <p className="italic font-serif text-white text-sm">
                &ldquo;El cine no es un trozo de vida, sino un trozo de pastel.&rdquo;
              </p>
              <p className="font-semibold text-sky-200 text-right">
                — Alfred Hitchcock
              </p>
              <div className="border-t border-sky-600/60 pt-2 text-[11px] text-sky-200">
                Analizamos cada película con rigor técnico: fotografía, montaje, sonido y dirección.
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-wider mb-4">
              Boletín Semanal
            </h4>
            <p className="text-xs text-sky-100 leading-relaxed mb-3">
              Recibe nuestras críticas dominicales sin spoilers directamente en tu bandeja.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="tu.email@cinefilo.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-300"
                required
              />
              <button
                type="submit"
                onClick={() => alert("¡Gracias por unirte a Filmy! Pronto recibirás nuestra selección cinematográfica.")}
                className="w-full px-4 py-2.5 rounded-xl bg-sky-950 hover:bg-slate-950 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Suscribirse</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Vercel Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-100 gap-4">
          <div className="flex items-center space-x-1 font-medium">
            <span>© {new Date().getFullYear()} Filmy. Todos los derechos reservados. Desarrollado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-300 inline fill-rose-300" />
            <span>para cineastas.</span>
          </div>

          <div className="flex items-center space-x-3 font-semibold text-sky-100">
            <span className="px-2.5 py-1 rounded-md bg-sky-800/80 border border-sky-400/30 text-white">
              ▲ Desplegado en Vercel
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-800/80 border border-sky-400/30 text-white">
              TypeScript & Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
