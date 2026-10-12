"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Sparkles, ArrowUpRight, Gauge, Clock, Ruler } from "lucide-react";
import { ATTRACTIONS, Attraction } from "@/data/attractions";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Spotlight } from "@/components/ui/spotlight";

interface AttractionsShowcaseProps {
  onOpenSpecs: (attraction: Attraction) => void;
  onBookPass: (attraction: Attraction) => void;
  selectedFilter: string;
  onSelectCategory: (category: string) => void;
}

const FILTER_PILLS = [
  "All 8 Realms",
  "Adrenaline",
  "Sensory Houses",
  "Water Park",
  "Resort & Dining",
];

export function AttractionsShowcase({
  onOpenSpecs,
  onBookPass,
  selectedFilter,
  onSelectCategory,
}: AttractionsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRealmIndex, setActiveRealmIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Monitor scroll progression across the 550vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Cinematic Zoom-In & Leveling Pitch (0.00 -> 0.15)
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.35, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [16, 0]);

  // Phase 2: Horizontal Translation Track (0.15 -> 0.85)
  // Maps 8 cards horizontally across the screen
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-87.5%"]);

  // Track progress bar width for the HUD (0% to 100%)
  const trackProgress = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  // Update active realm indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) {
      setActiveRealmIndex(1);
    } else if (latest >= 0.85) {
      setActiveRealmIndex(8);
    } else {
      const normalized = (latest - 0.15) / 0.70;
      const idx = Math.min(8, Math.max(1, Math.floor(normalized * 8) + 1));
      setActiveRealmIndex(idx);
    }
  });

  // Scroll to specific card when a category pill is clicked
  const handleJumpToCategory = (cat: string) => {
    onSelectCategory(cat);
    if (!containerRef.current) return;

    if (cat === "All 8 Realms") {
      const top = containerRef.current.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    const firstMatchIdx = ATTRACTIONS.findIndex((a) => a.category === cat);
    if (firstMatchIdx !== -1) {
      const containerTop = containerRef.current.offsetTop;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const fraction = 0.15 + (firstMatchIdx / 7) * 0.70;
      const targetY = containerTop + totalScrollable * fraction;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const currentAttraction = ATTRACTIONS[activeRealmIndex - 1] || ATTRACTIONS[0];

  return (
    <div
      ref={containerRef}
      id="attractions"
      className="relative h-[550vh] bg-[#050B14]"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050B14]">
        {/* Aceternity Sweeping Spotlights */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#0066FF"
        />
        <Spotlight
          className="-top-40 right-0 md:right-40 md:-top-20"
          fill="#FF5500"
        />

        {/* High-blur Radial Backlights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[160px] pointer-events-none rounded-full" />

        {/* FLOATING TOP HUD & REALM TRACKER */}
        <header className="relative z-20 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-1 font-display">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE 8 CINEMATIC REALMS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-display">
                WORLD-CLASS ATTRACTIONS
              </h2>
            </div>

            {/* Right HUD: Active Realm Pill + Dynamic Progress Bar */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#080E1A]/90 text-sky-400 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                  <span>
                    REALM 0{activeRealmIndex} OF 08 · {currentAttraction.title}
                  </span>
                </span>
              </div>

              {/* Dynamic Realm Progress Bar Line */}
              <div className="w-48 sm:w-64 h-1.5 bg-white/[0.08] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500] rounded-full"
                  style={{ width: trackProgress }}
                />
              </div>
            </div>
          </div>

          {/* Filter Pills Header */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-x-auto max-w-full mt-4">
            {FILTER_PILLS.map((pill) => {
              const isActive = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => handleJumpToCategory(pill)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0066FF] to-[#FF5500] text-white shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
        </header>

        {/* 3D ZOOM-IN WRAPPER & HORIZONTAL REEL */}
        <div
          className="relative flex-1 flex items-center overflow-hidden w-full"
          style={{ perspective: "1200px" }}
        >
          {/* Zoom and Pitch Animated Container */}
          <motion.div
            style={{
              scale,
              opacity,
              rotateX,
              transformOrigin: "center center",
            }}
            className="w-full flex items-center"
          >
            {/* Desktop Horizontal Sliding Track */}
            {!isMobile ? (
              <motion.div
                style={{ x }}
                className="flex items-center gap-8 sm:gap-12 px-6 sm:px-12 w-max"
              >
                {ATTRACTIONS.map((attraction, idx) => (
                  <div
                    key={attraction.id}
                    className="w-[85vw] sm:w-[680px] lg:w-[820px] shrink-0"
                  >
                    <CardContainer containerClassName="py-2">
                      <CardBody className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09111E]/80 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] shadow-2xl p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[480px] items-stretch">
                          {/* Visual Panel */}
                          <div
                            className={`lg:col-span-7 relative h-[250px] sm:h-[300px] lg:h-auto overflow-hidden ${
                              attraction.visualOrder === "left"
                                ? "lg:order-1"
                                : "lg:order-2"
                            }`}
                          >
                            <CardItem
                              translateZ="60"
                              className="w-full h-full relative"
                            >
                              <div
                                className={`relative w-full h-full overflow-hidden ${attraction.bgClass}`}
                              >
                                <div
                                  className={`absolute inset-0 ${attraction.radialClass}`}
                                />
                                {attraction.hasGrid && (
                                  <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
                                )}
                                <div
                                  className="absolute inset-0 w-full h-full pointer-events-none"
                                  dangerouslySetInnerHTML={{
                                    __html: attraction.svg,
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-black/50 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/80 via-transparent to-[#050B14]/70 pointer-events-none" />
                              </div>

                              {/* Badges */}
                              <div className="absolute top-4 left-4 z-20">
                                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#050B14]/85 text-white border border-white/10 backdrop-blur-md shadow-lg">
                                  {attraction.tagBadge}
                                </span>
                              </div>
                              <div className="absolute bottom-4 right-4 z-20">
                                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#050B14]/80 text-sky-400 border border-white/10 shadow-lg">
                                  {attraction.scheduleBadge}
                                </span>
                              </div>
                            </CardItem>
                          </div>

                          {/* Content Panel */}
                          <div
                            className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between ${
                              attraction.visualOrder === "left"
                                ? "lg:order-2"
                                : "lg:order-1"
                            }`}
                          >
                            <div>
                              {/* Metadata */}
                              <CardItem
                                translateZ="30"
                                className="flex items-center gap-2 text-xs text-slate-400 mb-2 flex-wrap"
                              >
                                <span className="font-semibold text-sky-400">
                                  {attraction.intensity}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{attraction.minHeight}</span>
                                <span aria-hidden="true">·</span>
                                <span>{attraction.duration}</span>
                              </CardItem>

                              {/* Title & Subtitle */}
                              <CardItem translateZ="40">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 font-display">
                                  {attraction.title}
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-[#FF5500] mb-3">
                                  {attraction.subtitle}
                                </p>
                              </CardItem>

                              {/* Description */}
                              <CardItem translateZ="20">
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4 line-clamp-3">
                                  {attraction.description}
                                </p>
                              </CardItem>

                              {/* Highlights */}
                              <CardItem translateZ="35" className="space-y-1 mb-6">
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                                  Key Highlights
                                </div>
                                {attraction.highlights.map((highlight, hIdx) => (
                                  <div
                                    key={hIdx}
                                    className="flex items-center gap-2 text-xs text-slate-200"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </CardItem>
                            </div>

                            {/* Action Buttons */}
                            <CardItem
                              translateZ="80"
                              className="flex items-center gap-3 pt-3 border-t border-white/[0.08] w-full"
                            >
                              <button
                                onClick={() => onOpenSpecs(attraction)}
                                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-colors flex items-center justify-center gap-1 group/btn"
                              >
                                <span>Overview &amp; Specs</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </button>
                              <button
                                onClick={() => onBookPass(attraction)}
                                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                              >
                                Book Pass
                              </button>
                            </CardItem>
                          </div>
                        </div>
                      </CardBody>
                    </CardContainer>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* Mobile Touch-Swipeable Fallback Container */
              <div className="w-full overflow-x-auto flex items-center gap-6 px-4 py-4 snap-x snap-mandatory">
                {ATTRACTIONS.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="w-[88vw] shrink-0 snap-center rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09111E]/90 backdrop-blur-xl shadow-2xl p-5"
                  >
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                      <div
                        className={`absolute inset-0 ${attraction.bgClass}`}
                      />
                      <div
                        className={`absolute inset-0 ${attraction.radialClass}`}
                      />
                      <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        dangerouslySetInnerHTML={{ __html: attraction.svg }}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#050B14]/85 text-white border border-white/10">
                        {attraction.tagBadge}
                      </span>
                    </div>

                    <div className="text-xs text-sky-400 font-semibold mb-1">
                      {attraction.intensity} · {attraction.duration}
                    </div>
                    <h3 className="text-xl font-extrabold text-white font-display mb-1">
                      {attraction.title}
                    </h3>
                    <p className="text-xs text-[#FF5500] font-medium mb-3">
                      {attraction.subtitle}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                      <button
                        onClick={() => onOpenSpecs(attraction)}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-white/[0.08]"
                      >
                        Specs ↗
                      </button>
                      <button
                        onClick={() => onBookPass(attraction)}
                        className="py-2 px-4 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500]"
                      >
                        Book Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* BOTTOM HUD / SCROLL HINT */}
        <div className="relative z-20 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0066FF]" />
            <span>Vertical Scroll moves Horizontal Reel</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            {activeRealmIndex} / 08 REALMS COMPLETED
          </div>
        </div>
      </div>
    </div>
  );
}
