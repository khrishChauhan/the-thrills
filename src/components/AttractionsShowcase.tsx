"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { ATTRACTIONS, Attraction } from "@/data/attractions";
import { Spotlight } from "@/components/ui/spotlight";
import { ParallaxCardImage } from "@/components/ui/ParallaxCardImage";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeRealmIndex, setActiveRealmIndex] = useState(1);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mathematical center-lock measurement for Card 8
  useEffect(() => {
    const updateScrollDistance = () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.children;
      if (cards.length === 0) return;

      const lastCard = cards[cards.length - 1] as HTMLElement;
      const viewportWidth = window.innerWidth;
      // Center of the last card relative to the track start
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
      // Target translation: align lastCardCenter with viewportWidth / 2
      const targetOffset = lastCardCenter - viewportWidth / 2;

      setMaxTranslateX(Math.max(0, targetOffset));
    };

    updateScrollDistance();
    const timer = setTimeout(updateScrollDistance, 150);
    window.addEventListener("resize", updateScrollDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollDistance);
    };
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
  const heroBgY = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [0, 100]);

  // Phase 2: Horizontal Translation Track with Mathematical Center-Lock & Dwell Buffer
  // Glides horizontally from 0.15 to 0.75, then firmly dwells dead-center from 0.75 to 0.90
  const x = useTransform(
    scrollYProgress,
    [0.15, 0.75, 0.90],
    [0, -maxTranslateX, -maxTranslateX]
  );

  // Track progress bar width for the HUD (0% to 100% across the glide range)
  const trackProgress = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  // Section 1: Dynamic Multi-Color Gradient Parallax
  // Electric Blue / Cyan Orb (Top Right): Drifts down and inwards with pulsing scale
  const blueOrbX = useTransform(scrollYProgress, [0, 1], ["0px", "-220px"]);
  const blueOrbY = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);
  const blueOrbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.95]);

  // Sunset Flare Orange Orb (Bottom Left): Drifts up and across
  const orangeOrbX = useTransform(scrollYProgress, [0, 1], ["0px", "240px"]);
  const orangeOrbY = useTransform(scrollYProgress, [0, 1], ["0px", "-180px"]);
  const orangeOrbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.35, 1]);

  // Central Aurora Mesh (Deep Midnight Nebula): Subtle breathing rotation
  const auraRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Update active realm indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) {
      setActiveRealmIndex(1);
    } else if (latest >= 0.75) {
      setActiveRealmIndex(8);
    } else {
      const normalized = (latest - 0.15) / 0.60;
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
      const fraction = 0.15 + (firstMatchIdx / 7) * 0.60;
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
      {/* 100vh Pinned Viewport Container with Precise Height Budgeting */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-8 bg-[#050B14] select-none">
        {/* HERO BACKGROUND INTEGRATION: Deeply Darkened Park Entrance Arch Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 z-0">
          <motion.div
            style={{ y: heroBgY }}
            className="relative w-full h-[125%] -top-[12.5%]"
          >
            <Image
              src="/images/park-entrance-arch.jpg"
              alt="The Thrills Grand Park Entrance Arch"
              fill
              className="object-cover filter brightness-50"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/85 via-[#050B14]/65 to-[#050B14]" />
        </div>

        {/* Aceternity Sweeping Spotlights */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 z-[1]"
          fill="#0066FF"
        />
        <Spotlight
          className="-top-40 right-0 md:right-40 md:-top-20 z-[1]"
          fill="#FF5500"
        />

        {/* Multi-Color Parallax Aurora Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Blue/Cyan Nebula Orb */}
          <motion.div
            style={{ x: blueOrbX, y: blueOrbY, scale: blueOrbScale }}
            className="absolute -top-10 right-0 w-[550px] lg:w-[700px] h-[550px] lg:h-[700px] bg-gradient-to-br from-[#0066FF]/20 via-[#38BDF8]/15 to-transparent rounded-full blur-[140px] will-change-transform"
          />
          {/* Molten Orange / Amber Flare Orb */}
          <motion.div
            style={{ x: orangeOrbX, y: orangeOrbY, scale: orangeOrbScale }}
            className="absolute -bottom-10 left-0 w-[600px] lg:w-[750px] h-[600px] lg:h-[750px] bg-gradient-to-tr from-[#FF5500]/18 via-[#FFAA00]/12 to-transparent rounded-full blur-[160px] will-change-transform"
          />
          {/* Central Depth Core */}
          <motion.div
            style={{ rotate: auraRotate }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-[180px] will-change-transform"
          />
        </div>

        {/* COMPACT CINEMATIC HUD HEADER (Rows 1 & 2) */}
        <header className="relative z-20 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full shrink-0">
          {/* Row 1: Kicker & Title (Left) + Active Realm Tracker (Right) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-2.5 font-display">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE 8 CINEMATIC REALMS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-3 font-display">
                WORLD-CLASS ATTRACTIONS
              </h2>
            </div>

            {/* Right: Floating Compact Pill + Progress Line */}
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#080E1A]/90 text-sky-400 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                <span>
                  REALM 0{activeRealmIndex} OF 08 · {currentAttraction.title}
                </span>
              </span>

              {/* Slim Progress Line */}
              <div className="w-40 sm:w-52 h-1 bg-white/[0.08] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500] rounded-full"
                  style={{ width: trackProgress }}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Filter Tabs with Compact Clear Margins */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-x-auto max-w-full mt-2 mb-4 lg:mb-5">
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

        {/* HORIZONTAL REEL TRACK: FLOATING CENTRALLY WITH ZERO CLIPPING */}
        <div className="relative flex-1 flex items-center my-auto overflow-hidden w-full">
          {/* Zoom & Pitch Animated Container (Entry phase only) */}
          <motion.div
            style={{
              scale,
              opacity,
              rotateX,
              transformOrigin: "center center",
            }}
            className="w-full flex items-center"
          >
            {/* Desktop Horizontal Sliding Track with Mathematical Center-Lock */}
            {!isMobile ? (
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="relative flex items-center gap-8 lg:gap-12 pl-8 sm:pl-16 pr-8 sm:pr-16 my-auto w-max"
              >
                {ATTRACTIONS.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="w-[84vw] max-w-[940px] lg:w-[900px] h-[440px] sm:h-[460px] max-h-[55vh] shrink-0"
                  >
                    {/* FLAT LUXURY CARD CONTAINER (NEVER EXCEEDS VIEWPORT - ZERO TOP OR BOTTOM CLIPPING) */}
                    <div className="group/card relative h-full w-full rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/[0.22] bg-[#09111E]/80 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)] shadow-2xl p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                        {/* LEFT COLUMN: TEXT, SPECS & UNCLIPPED BUTTONS (5 COLS) */}
                        <div className="lg:col-span-5 p-5 lg:p-6 flex flex-col justify-between h-full overflow-hidden bg-[#080E1A]/60 border-r border-white/[0.06]">
                          {/* Top Content Block */}
                          <div className="flex-1 flex flex-col justify-start">
                            {/* Meta row */}
                            <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-sky-400">
                                {attraction.intensity}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{attraction.minHeight}</span>
                              <span aria-hidden="true">·</span>
                              <span>{attraction.duration}</span>
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-lg lg:text-xl font-black text-white leading-tight tracking-tight mb-0.5 font-display">
                              {attraction.title}
                            </h3>
                            <p className="text-xs font-semibold text-[#FF5500] leading-snug mb-1.5 font-display">
                              {attraction.subtitle}
                            </p>

                            {/* Description */}
                            <p className="text-xs text-slate-300 leading-relaxed font-light mb-2 line-clamp-2">
                              {attraction.description}
                            </p>

                            {/* Highlights Section */}
                            <div className="mt-0.5">
                              <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1 font-display">
                                Key Highlights
                              </div>
                              <div className="space-y-1 mb-2">
                                {attraction.highlights.map((highlight, hIdx) => (
                                  <div
                                    key={hIdx}
                                    className="text-[11px] text-slate-200 flex items-center gap-1.5"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* BOTTOM ACTION BUTTONS (SHRINK-0 GUARANTEES ZERO CLIPPING) */}
                          <div className="shrink-0 pt-2.5 border-t border-white/[0.08] flex items-center gap-2 w-full">
                            <button
                              onClick={() => onOpenSpecs(attraction)}
                              className="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-colors flex items-center justify-center gap-1.5 group/btn"
                            >
                              <span>Overview &amp; Specs</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                            <button
                              onClick={() => onBookPass(attraction)}
                              className="py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 whitespace-nowrap active:scale-95 transition-all"
                            >
                              Book Pass
                            </button>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: REAL PHOTOGRAPHY PARALLAX CARD IMAGE (7 COLS) */}
                        <div className="lg:col-span-7 h-full w-full relative overflow-hidden bg-[#0A1118]">
                          <ParallaxCardImage
                            src={attraction.image}
                            alt={attraction.title}
                            badgeTopLeft={attraction.tagBadge}
                            badgeBottomRight={attraction.scheduleBadge}
                            accentColor={attraction.accentColor}
                          />
                        </div>
                      </div>
                    </div>
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
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                      <ParallaxCardImage
                        src={attraction.image}
                        alt={attraction.title}
                        badgeTopLeft={attraction.tagBadge}
                        badgeBottomRight={attraction.scheduleBadge}
                        accentColor={attraction.accentColor}
                      />
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
        <div className="relative z-20 pb-3 lg:pb-4 pt-1 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-slate-500">
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
