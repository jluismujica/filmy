"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Star, Calendar, Clock, Film, Award, Share2, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { MovieArticle } from "@/types/movie";

interface ArticleModalProps {
  movie: MovieArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (movie) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-300">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg cursor-pointer border border-white/20"
          aria-label="Cerrar artículo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          {/* Hero Banner Header */}
          <div className="relative h-80 sm:h-96 w-full bg-slate-950">
            <Image
              src={movie.backdropImage || movie.coverImage}
              alt={movie.title}
              fill
              className="object-cover object-center brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Movie metadata over hero */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow"
                  >
                    {g}
                  </span>
                ))}
                <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{movie.rating.toFixed(1)} / 5.0</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {movie.year}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-sky-300" />
                  <span>{movie.duration}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-sm font-semibold text-sky-200 mt-1">
                  Título original: <em>{movie.originalTitle}</em> • Dirigida por {movie.director}
                </p>
              )}
            </div>
          </div>

          {/* Article Editorial Meta & Body */}
          <div className="p-6 sm:p-10 max-w-3xl mx-auto">
            {/* Subtitle / Lead */}
            <div className="border-l-4 border-sky-500 pl-4 py-1 mb-8">
              <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                {movie.subtitle}
              </p>
            </div>

            {/* Author and Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-sky-50 rounded-2xl border border-sky-100 mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-sky-400 shadow">
                  <Image
                    src={movie.author.avatar}
                    alt={movie.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{movie.author.name}</h4>
                  <p className="text-xs font-medium text-sky-800">{movie.author.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Publicado el {movie.date}</span>
              </div>
            </div>

            {/* Iconic Quote */}
            {movie.quote && (
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white relative shadow-xl overflow-hidden">
                <Quote className="absolute right-4 bottom-2 w-20 h-20 text-white/5 pointer-events-none" />
                <p className="text-lg sm:text-xl font-serif italic text-sky-100 relative z-10 mb-2">
                  &ldquo;{movie.quote.text}&rdquo;
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 relative z-10">
                  — {movie.quote.character}
                </p>
              </div>
            )}

            {/* Introduction */}
            <div className="prose max-w-none text-slate-700 leading-relaxed text-base sm:text-lg mb-8">
              <p>{movie.content.introduction}</p>
            </div>

            {/* Article Sections */}
            <div className="space-y-8 my-8">
              {movie.content.sections.map((section, idx) => (
                <div key={idx} className="border-t border-slate-100 pt-6">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                    {section.heading}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    {section.body}
                  </p>
                  {section.highlight && (
                    <div className="mt-4 p-4 rounded-xl bg-sky-50 border-l-4 border-sky-600 text-sky-950 font-semibold text-sm sm:text-base">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span>{section.highlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Verdict Box */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-600 to-sky-800 text-white shadow-xl">
              <div className="flex items-center space-x-2 text-sky-200 text-xs font-black uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Veredicto Filmy</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-3">Conclusión Crítica</h4>
              <p className="text-sky-50 leading-relaxed text-base mb-6">
                {movie.content.verdict}
              </p>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-sky-200">
                    Evaluación Final
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {movie.content.scoreExplanation}
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-white text-slate-950 px-4 py-2 rounded-xl font-black text-lg shadow">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>{movie.rating.toFixed(1)} / 5</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Artículo verificado para la comunidad Filmy</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow transition-colors cursor-pointer"
              >
                Cerrar Artículo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
