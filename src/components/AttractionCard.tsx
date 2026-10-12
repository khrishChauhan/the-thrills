"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Attraction } from "@/data/attractions";

interface AttractionCardProps {
  attraction: Attraction;
  onOpenSpecs: (attraction: Attraction) => void;
  onBookPass: (attraction: Attraction) => void;
}

export function AttractionCard({
  attraction,
  onOpenSpecs,
  onBookPass,
}: AttractionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [flashlight, setFlashlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ x: rotateX, y: rotateY });
    setFlashlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setFlashlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const isVisualLeft = attraction.visualOrder === "left";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09111E]/70 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] shadow-2xl"
      style={{ perspective: 1200 }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0px)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-stretch">
          {/* Visual Panel */}
          <div
            className={`lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-auto overflow-hidden ${
              isVisualLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className={`relative w-full h-full overflow-hidden ${attraction.bgClass}`}>
              {/* Radial ambiance */}
              <div className={`absolute inset-0 ${attraction.radialClass}`} />

              {/* Grid pattern if Fun Zone */}
              {attraction.hasGrid && (
                <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
              )}

              {/* Vector SVG illustration */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                dangerouslySetInnerHTML={{ __html: attraction.svg }}
              />

              {/* Lighting overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-black/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/80 via-transparent to-[#050B14]/70 pointer-events-none" />
            </div>

            {/* Top-left tag badge */}
            <div className="absolute top-5 left-5 z-20">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#050B14]/85 text-white border border-white/10 backdrop-blur-md shadow-lg">
                {attraction.tagBadge}
              </span>
            </div>

            {/* Bottom-right schedule badge */}
            <div className="absolute bottom-4 right-4 z-20">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#050B14]/80 text-sky-400 border border-white/10 shadow-lg">
                {attraction.scheduleBadge}
              </span>
            </div>
          </div>

          {/* Content Panel */}
          <div
            className={`lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between ${
              isVisualLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div>
              {/* Metadata row */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 flex-wrap">
                <span className="font-semibold text-sky-400">{attraction.intensity}</span>
                <span aria-hidden="true">·</span>
                <span>{attraction.minHeight}</span>
                <span aria-hidden="true">·</span>
                <span>{attraction.duration}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">
                {attraction.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#FF5500] mb-4">
                {attraction.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {attraction.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-8">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Key Experience Highlights
                </div>
                {attraction.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => onOpenSpecs(attraction)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-colors flex items-center justify-center gap-1.5 group"
              >
                <span>Full Overview &amp; Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onBookPass(attraction)}
                className="py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Book Pass
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic mouse-following radial flashlight effect */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: flashlight.opacity,
            background: `radial-gradient(circle at ${flashlight.x}px ${flashlight.y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}
