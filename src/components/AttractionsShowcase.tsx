"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
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
      {/* 100vh Pinned Viewport Container with Generous Top Navbar Clearance */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050B14] pt-20 lg:pt-24 select-none">
        {/* Aceternity Sweeping Spotlights */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#0066FF"
        />
        <Spotlight
          className="-top-40 right-0 md:right-40 md:-top-20"
          fill="#FF5500"
        />

        {/* High-blur Radial Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[160px] pointer-events-none rounded-full" />

        {/* COMPACT CINEMATIC HUD HEADER (Rows 1 & 2) */}
        <header className="relative z-20 px-4 sm:px-8 max-w-7xl mx-auto w-full shrink-0">
          {/* Row 1: Kicker & Title (Left) + Active Realm Tracker (Right) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF5500] mb-1 font-display">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE 8 CINEMATIC REALMS</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight font-display">
                WORLD-CLASS ATTRACTIONS
              </h2>
            </div>

            {/* Right: Floating Compact Pill + Progress Line */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#080E1A]/90 text-sky-400 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                <span>
                  REALM 0{activeRealmIndex} OF 08 · {currentAttraction.title}
                </span>
              </span>

              {/* Slim Progress Line */}
              <div className="w-44 sm:w-56 h-1 bg-white/[0.08] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500] rounded-full"
                  style={{ width: trackProgress }}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Filter Tabs with 32px-40px bottom margin clearance */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-x-auto max-w-full mt-3 mb-8 lg:mb-10">
            {FILTER_PILLS.map((pill) => {
              const isActive = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => handleJumpToCategory(pill)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
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

        {/* 3D REEL TRACK: FLOATING CENTRALLY IN THE REMAINING VIEWPORT */}
        <div
          className="relative flex-1 flex items-center my-auto overflow-hidden w-full"
          style={{ perspective: "1200px" }}
        >
          {/* Zoom & Pitch Animated Container */}
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
                className="flex items-center gap-8 lg:gap-12 px-8 sm:px-16 w-max"
              >
                {ATTRACTIONS.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="w-[82vw] max-w-[960px] lg:w-[920px] h-[480px] lg:h-[500px] max-h-[56vh] shrink-0"
                  >
                    <CardContainer containerClassName="h-full w-full py-0" className="h-full w-full">
                      <CardBody className="relative h-full w-full rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09111E]/80 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] shadow-2xl p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                          {/* Left Column: Text & Specs (5 cols) */}
                          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between h-full bg-[#080E1A]/60 border-r border-white/[0.06]">
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
                                <h3 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-0.5 font-display">
                                  {attraction.title}
                                </h3>
                                <p className="text-xs lg:text-sm font-semibold text-[#FF5500] mb-2 font-display">
                                  {attraction.subtitle}
                                </p>
                              </CardItem>

                              {/* Description */}
                              <CardItem translateZ="20">
                                <p className="text-xs lg:text-sm text-slate-300 line-clamp-2 lg:line-clamp-3 leading-relaxed mb-4 font-light">
                                  {attraction.description}
                                </p>
                              </CardItem>

                              {/* Highlights */}
                              <CardItem translateZ="35" className="space-y-1.5 mb-4">
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
                                className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-colors flex items-center justify-center gap-1 group/btn"
                              >
                                <span>Overview &amp; Specs</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </button>
                              <button
                                onClick={() => onBookPass(attraction)}
                                className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                              >
                                Book Pass
                              </button>
                            </CardItem>
                          </div>

                          {/* Right Column: Vector Art Visual (7 cols) */}
                          <div className="lg:col-span-7 h-full relative overflow-hidden bg-[#0A1118]">
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

                              {/* Badges with text-[11px] */}
                              <div className="absolute top-4 left-4 z-20">
                                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#050B14]/85 text-white border border-white/10 backdrop-blur-md shadow-lg">
                                  {attraction.tagBadge}
                                </span>
                              </div>
                              <div className="absolute bottom-4 right-4 z-20">
                                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#050B14]/80 text-sky-400 border border-white/10 shadow-lg">
                                  {attraction.scheduleBadge}
                                </span>
                              </div>
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
              <div className="w-full overflow-x-auto flex items-center gap-5 px-4 py-2 snap-x snap-mandatory">
                {ATTRACTIONS.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="w-[85vw] max-w-[380px] shrink-0 snap-center rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09111E]/95 backdrop-blur-xl shadow-2xl p-5"
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
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
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#050B14]/85 text-white border border-white/10">
                        {attraction.tagBadge}
                      </span>
                    </div>

                    <div className="text-[11px] text-sky-400 font-semibold mb-1">
                      {attraction.intensity} · {attraction.duration}
                    </div>
                    <h3 className="text-lg font-extrabold text-white font-display mb-0.5">
                      {attraction.title}
                    </h3>
                    <p className="text-xs text-[#FF5500] font-medium mb-3">
                      {attraction.subtitle}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                      <button
                        onClick={() => onOpenSpecs(attraction)}
                        className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-white/[0.08]"
                      >
                        Specs ↗
                      </button>
                      <button
                        onClick={() => onBookPass(attraction)}
                        className="py-1.5 px-3.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500]"
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

        {/* BOTTOM HUD & MICRO-INDICATORS */}
        <div className="relative z-20 pb-5 lg:pb-6 pt-3 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span className="text-[11px] text-slate-400 font-mono">
              Vertical Scroll moves Horizontal Reel
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono tracking-wider">
            0{activeRealmIndex} / 08 REALMS COMPLETED
          </div>
        </div>
      </div>
    </div>
  );
}
