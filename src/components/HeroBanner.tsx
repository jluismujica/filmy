"use client";

import React from "react";
import Image from "next/image";
import { Star, Flame, Play, ArrowRight, Award } from "lucide-react";
import { MovieArticle } from "@/types/movie";

interface HeroBannerProps {
  featuredMovie: MovieArticle;
  onOpenArticle: (movie: MovieArticle) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ featuredMovie, onOpenArticle }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-8 pb-12 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 card-shadow-cinematic border border-sky-200">
          {/* Background backdrop with cinematic overlay */}
          <div className="relative h-[420px] sm:h-[460px] md:h-[500px] w-full">
            <Image
              src={featuredMovie.backdropImage || featuredMovie.coverImage}
              alt={featuredMovie.title}
              fill
              className="object-cover object-center brightness-75 hover:scale-105 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layered cinematic gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-end max-w-2xl text-white">
              <div className="flex items-center space-x-2 mb-3">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-sky-500 text-white tracking-wider uppercase shadow-lg shadow-sky-500/40">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Crítica Destacada de la Semana</span>
                </span>
                <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{featuredMovie.rating.toFixed(1)} / 5</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
                {featuredMovie.title}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-sky-100 leading-relaxed mb-4 line-clamp-2">
                {featuredMovie.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-6 hidden sm:block">
                {featuredMovie.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenArticle(featuredMovie)}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm shadow-xl shadow-sky-600/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  <span>Leer Análisis Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-3 text-xs text-sky-200 font-medium bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <span>Por {featuredMovie.author.name}</span>
                  <span>•</span>
                  <span>{featuredMovie.duration}</span>
                  <span>•</span>
                  <span>{featuredMovie.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
