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
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
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

  // Mathematical center-lock measurement for Card 8 (Desktop only)
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

  // Monitor scroll progression across the 550vh container (Desktop)
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
  const x = useTransform(
    scrollYProgress,
    [0.15, 0.75, 0.90],
    [0, -maxTranslateX, -maxTranslateX]
  );

  // Track progress bar width for the HUD (0% to 100% across the glide range)
  const trackProgress = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  // Section 1: Dynamic Multi-Color Gradient Parallax
  const blueOrbX = useTransform(scrollYProgress, [0, 1], ["0px", "-220px"]);
  const blueOrbY = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);
  const blueOrbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.95]);

  const orangeOrbX = useTransform(scrollYProgress, [0, 1], ["0px", "240px"]);
  const orangeOrbY = useTransform(scrollYProgress, [0, 1], ["0px", "-180px"]);
  const orangeOrbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.35, 1]);

  const auraRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Update active realm indicator on Desktop scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
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

  // Mobile carousel scroll listener to keep active index and indicators in sync
  const handleMobileCarouselScroll = () => {
    if (!mobileCarouselRef.current) return;
    const { scrollLeft } = mobileCarouselRef.current;
    const firstCard = mobileCarouselRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 16; // 16px is gap-4
    const index = Math.round(scrollLeft / cardWidth);
    const clampedIndex = Math.min(ATTRACTIONS.length, Math.max(1, index + 1));
    setActiveRealmIndex(clampedIndex);
  };

  // Scroll to specific card when a category pill is clicked
  const handleJumpToCategory = (cat: string) => {
    onSelectCategory(cat);

    const firstMatchIdx =
      cat === "All 8 Realms"
        ? 0
        : ATTRACTIONS.findIndex((a) => a.category === cat);

    // On Mobile: smoothly scroll the mobile snap container to the target card
    if (isMobile && mobileCarouselRef.current) {
      if (firstMatchIdx !== -1) {
        const cards = mobileCarouselRef.current.children;
        if (cards[firstMatchIdx]) {
          const cardElem = cards[firstMatchIdx] as HTMLElement;
          mobileCarouselRef.current.scrollTo({
            left: cardElem.offsetLeft - 20,
            behavior: "smooth",
          });
        }
      }
      return;
    }

    // On Desktop: smoothly scroll page to mapped position on 550vh track
    if (!containerRef.current) return;

    if (cat === "All 8 Realms") {
      const top = containerRef.current.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    if (firstMatchIdx !== -1) {
      const containerTop = containerRef.current.offsetTop;
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;
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
      className="relative h-auto py-12 sm:py-16 md:py-0 md:h-[550vh] bg-[#050B14]"
    >
      {/* Viewport Container: Responsive Branching */}
      <div className="relative h-auto w-full flex flex-col justify-start pt-4 pb-6 overflow-visible md:sticky md:top-0 md:h-screen md:overflow-hidden md:flex md:flex-col md:justify-between md:pt-32 md:pb-8 select-none bg-[#050B14]">
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
        <header className="relative z-20 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full shrink-0">
          {/* Row 1: Kicker & Title (Left) + Active Realm Tracker (Right) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-1.5 sm:mb-2.5 font-display">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE 8 CINEMATIC REALMS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-1 sm:mb-3 font-display">
                WORLD-CLASS ATTRACTIONS
              </h2>
            </div>

            {/* Right: Floating Compact Pill + Progress Line */}
            <div className="flex flex-col items-start md:items-end gap-1 mt-1 md:mt-0">
              <span className="px-2.5 sm:px-3 py-1 sm:py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-[#080E1A]/90 text-sky-400 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                <span>
                  REALM 0{activeRealmIndex} OF 08 · {currentAttraction.title}
                </span>
              </span>

              {/* Slim Progress Line */}
              <div className="w-40 sm:w-52 h-1 bg-white/[0.08] rounded-full overflow-hidden relative">
                {isMobile ? (
                  <div
                    className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500] rounded-full transition-all duration-300"
                    style={{ width: `${((activeRealmIndex - 1) / 7) * 100}%` }}
                  />
                ) : (
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500] rounded-full"
                    style={{ width: trackProgress }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Filter Tabs with Compact Clear Margins */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-x-auto scrollbar-none max-w-full my-3 sm:mt-2 sm:mb-4 lg:mb-5">
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

        {/* DESKTOP HORIZONTAL REEL TRACK (Hidden on Mobile) */}
        <div className="hidden md:flex relative flex-1 items-center my-auto overflow-hidden w-full">
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
                  {/* Flat Luxury Card Container */}
                  <div className="group/card relative h-full w-full rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/[0.22] bg-[#09111E]/80 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)] shadow-2xl p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                      {/* Left Column: Text, Specs & Buttons (5 cols) */}
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

                        {/* Bottom Action Buttons */}
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

                      {/* Right Column: Parallax Card Image (7 cols) */}
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
          </motion.div>
        </div>

        {/* MOBILE HORIZONTAL SNAP CAROUSEL (Visible only on Mobile) */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileCarouselScroll}
          className="md:hidden w-full overflow-x-auto flex items-stretch gap-4 px-5 py-4 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {ATTRACTIONS.map((attraction) => (
            <div
              key={attraction.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center rounded-3xl overflow-hidden border border-white/[0.09] bg-[#09111E]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between p-4"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-3.5">
                  <ParallaxCardImage
                    src={attraction.image}
                    alt={attraction.title}
                    badgeTopLeft={attraction.tagBadge}
                    badgeBottomRight={attraction.scheduleBadge}
                    accentColor={attraction.accentColor}
                  />
                </div>

                {/* Specs row */}
                <div className="text-[10px] text-sky-400 font-semibold mb-1 flex items-center gap-1.5 flex-wrap">
                  <span>{attraction.intensity}</span>
                  <span aria-hidden="true">·</span>
                  <span>{attraction.minHeight}</span>
                  <span aria-hidden="true">·</span>
                  <span>{attraction.duration}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-black text-white font-display leading-tight mb-0.5">
                  {attraction.title}
                </h3>
                <p className="text-xs font-semibold text-[#FF5500] mb-2 font-display">
                  {attraction.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-2.5 line-clamp-2">
                  {attraction.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-1 mb-3">
                  {attraction.highlights.slice(0, 2).map((h, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-white/[0.08] flex items-center gap-2 w-full mt-auto">
                <button
                  onClick={() => onOpenSpecs(attraction)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-white/[0.08] active:bg-white/[0.14] border border-white/[0.1] text-center"
                >
                  Specs &amp; Guide ↗
                </button>
                <button
                  onClick={() => onBookPass(attraction)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] active:scale-95 shadow-md shadow-blue-500/25 text-center"
                >
                  Book Pass
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM HUD & MICRO-INDICATORS */}
        {/* Desktop HUD */}
        <div className="relative z-20 pb-3 lg:pb-4 pt-1 px-4 sm:px-8 max-w-7xl mx-auto w-full hidden md:flex items-center justify-between text-xs text-slate-500">
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

        {/* Mobile HUD */}
        <div className="relative z-20 pt-2 px-5 max-w-7xl mx-auto w-full flex md:hidden items-center justify-between text-xs">
          {/* Left: Pulsing blue indicator + Swipe hint */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span className="text-[11px] text-slate-400 font-mono">
              Swipe to explore realms →
            </span>
          </div>

          {/* Right: Dots pagination representing the 8 cards */}
          <div className="flex items-center gap-1.5">
            {ATTRACTIONS.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeRealmIndex === dotIdx + 1
                    ? "w-4 bg-gradient-to-r from-[#0066FF] to-[#FF5500]"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
