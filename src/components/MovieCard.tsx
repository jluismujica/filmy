"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Star, Calendar, User, ArrowUpRight, Clock, Award } from "lucide-react";
import { MovieArticle } from "@/types/movie";

interface MovieCardProps {
  movie: MovieArticle;
  onClick: (movie: MovieArticle) => void;
  index: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Parallax tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-10deg to 10deg)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position percentage
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  // Helper to render stars (1 to 5)
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center space-x-1" title={`Calificación: ${rating} de 5`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= fullStars;
          const isHalf = starIndex === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={starIndex}
              className={`w-4 h-4 ${
                isFilled
                  ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                  : isHalf
                  ? "text-amber-400 fill-amber-400/50"
                  : "text-slate-300"
              }`}
            />
          );
        })}
        <span className="ml-1 text-xs font-black text-slate-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded">
          {rating.toFixed(1)}/5
        </span>
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(movie)}
      className="perspective-container group cursor-pointer"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden card-shadow-cinematic border border-slate-200/90 transition-transform duration-200 ease-out flex flex-col h-full select-none"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Parallax Image Container */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <Image
            src={movie.coverImage}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
            priority={index === 0}
          />
          {/* Subtle gradient vignette over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Top Badges (Genre & Rating) */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-sky-600/90 hover:bg-sky-500 text-white shadow-md backdrop-blur-md border border-white/20 uppercase tracking-wide">
              {movie.genres[0]}
            </span>

            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-lg">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black text-white">{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Bottom of Image: Year & Duration pills */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 text-white/90 text-xs font-medium">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/15">
              {movie.year} • {movie.director}
            </span>
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/15">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{movie.duration}</span>
            </span>
          </div>

          {/* Dynamic Light Sheen / Glare */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
              opacity: glarePosition.opacity,
            }}
          />
        </div>

        {/* Card Content Area - Clean Crisp White with High Contrast Slate Text */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            {/* Rating Bar */}
            <div className="flex items-center justify-between mb-3">
              {renderStars(movie.rating)}
              <span className="text-xs font-bold text-sky-700 flex items-center group-hover:translate-x-0.5 transition-transform">
                Leer crítica <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 text-sky-600" />
              </span>
            </div>

            {/* Title (High contrast text-slate-900) */}
            <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-1 mb-1.5">
              {movie.title}
            </h3>

            {/* Subtitle (Crisp and descriptive as requested) */}
            <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2 mb-4">
              {movie.subtitle}
            </p>

            {/* Short excerpt snippet */}
            <p className="text-xs text-slate-500 leading-normal line-clamp-2 mb-4 italic border-l-2 border-sky-400 pl-2.5">
              &ldquo;{movie.excerpt}&rdquo;
            </p>
          </div>

          {/* Card Footer: Creation Date and Author (Explicitly requested) */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
            {/* Author */}
            <div className="flex items-center space-x-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-sky-200 shadow-sm flex-shrink-0">
                <Image
                  src={movie.author.avatar}
                  alt={movie.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {movie.author.name}
                </span>
                <span className="text-[10px] font-medium text-sky-700">
                  {movie.author.role}
                </span>
              </div>
            </div>

            {/* Creation Date */}
            <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
              <Calendar className="w-3.5 h-3.5 text-sky-600 mr-1.5 flex-shrink-0" />
              <span>{movie.date}</span>
            </div>
          </div>
        </div>

        {/* Accent Celeste bottom line */}
        <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>
  );
};
