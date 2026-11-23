"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { MovieCard } from "@/components/MovieCard";
import { ArticleModal } from "@/components/ArticleModal";
import { Footer } from "@/components/Footer";
import { MOVIES_DATA } from "@/data/movies";
import { MovieArticle } from "@/types/movie";
import { Film, Sparkles, FilterX } from "lucide-react";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<MovieArticle | null>(null);

  // Featured movie is "Bastardos sin Gloria" as requested
  const featuredMovie = useMemo(() => {
    return MOVIES_DATA.find((m) => m.id === "bastardos-sin-gloria") || MOVIES_DATA[0];
  }, []);

  // Filter movies by genre and search query
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      // Genre filter
      const matchesGenre =
        selectedGenre === "Todos" ||
        movie.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()));

      // Search query filter (matches title, director, author, subtitle)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(q)) ||
        movie.director.toLowerCase().includes(q) ||
        movie.author.name.toLowerCase().includes(q) ||
        movie.subtitle.toLowerCase().includes(q);

      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Genre Navigation Menu */}
      <Header
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={filteredMovies.length}
      />

      {/* Hero Spotlight on Bastardos sin Gloria (when no active search/genre) */}
      {selectedGenre === "Todos" && !searchQuery && (
        <HeroBanner
          featuredMovie={featuredMovie}
          onOpenArticle={(movie) => setSelectedMovie(movie)}
        />
      )}

      {/* Main Display Area (White Background as explicitly requested) */}
      <main className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8 film-grain">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>Zona de Despliegue de Críticas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedGenre === "Todos" ? "Todas las Películas & Ensayos" : `Género: ${selectedGenre}`}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Haz clic sobre cualquier tarjeta para desplegar el análisis completo cuadro a cuadro.
              </p>
            </div>

            {/* Active filters indicators */}
            {(selectedGenre !== "Todos" || searchQuery) && (
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedGenre("Todos");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold border border-sky-200 cursor-pointer transition-colors"
                >
                  <FilterX className="w-3.5 h-3.5" />
                  <span>Limpiar filtros</span>
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid: Parallax 3D & Noticeable Shadows ("sombra vistosa") */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  onClick={(m) => setSelectedMovie(m)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-200">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No encontramos películas para esta búsqueda
              </h3>
              <p className="text-sm font-medium text-slate-600 mb-6">
                Intenta seleccionando otro género o eliminando el término de búsqueda para ver todo el catálogo.
              </p>
              <button
                onClick={() => {
                  setSelectedGenre("Todos");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow cursor-pointer transition-colors"
              >
                Ver todas las películas
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Prominent Celeste Footer as requested */}
      <Footer onSelectGenre={setSelectedGenre} />

      {/* Article Modal (Unfolds the movie review on card click) */}
      <ArticleModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
