"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Ticket, Zap, Shield } from "lucide-react";
import { PASSES, ASSURANCE_BADGES, PassTier, AssuranceBadge } from "@/data/passes";
import { PricingCard } from "@/components/PricingCard";

interface PassesSectionProps {
  onSelectPass: (tierId: string) => void;
}

/**
 * Interactive Magnetic Assurance Badge with spring-animated mouse tracking
 * and soft radial spotlight revealing under the cursor.
 */
function MagneticAssuranceBadge({ badge }: { badge: AssuranceBadge }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth luxury spring physics
  const springConfig = { damping: 15, stiffness: 260 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Shift icon and text 4px to 6px toward the mouse
    const shiftX = ((x - centerX) / centerX) * 5.5;
    const shiftY = ((y - centerY) / centerY) * 5.5;

    mouseX.set(shiftX);
    mouseY.set(shiftY);
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] transition-colors duration-300 flex items-center gap-3 overflow-hidden cursor-default select-none"
    >
      {/* Soft radial spotlight under cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(150px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
      />

      {/* Spring-shifted Icon */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="shrink-0 relative z-10 will-change-transform"
      >
        {badge.icon === "zap" && (
          <Zap className={`w-5 h-5 ${badge.colorClass}`} />
        )}
        {badge.icon === "shield" && (
          <Shield className={`w-5 h-5 ${badge.colorClass}`} />
        )}
        {badge.icon === "ticket" && (
          <Ticket className={`w-5 h-5 ${badge.colorClass}`} />
        )}
      </motion.div>

      {/* Spring-shifted Text */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="text-xs relative z-10 will-change-transform"
      >
        <div className="font-semibold text-white group-hover:text-white transition-colors">
          {badge.title}
        </div>
        <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
          {badge.description}
        </div>
      </motion.div>
    </div>
  );
}

export function PassesSection({ onSelectPass }: PassesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Section-level scroll tracker for differential card elevation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 1. Day Thrill Pass (Standard ₹699): moderate speed upward (60 -> -40)
  const yStandard = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [60, -40]
  );

  // 2. All-Access Ultra Pass (VIP ₹999): deeper parallax speed upward (130 -> -70)
  // Visibly overtakes standard card during scroll
  const yVip = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [130, -70]
  );

  // Background Parallax for Passes Section
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["-15%", "15%"]
  );

  const standardPass = PASSES[0];
  const vipPass = PASSES[1];

  return (
    <section
      ref={sectionRef}
      id="passes"
      className="py-28 sm:py-36 bg-[#050B14] relative overflow-hidden"
    >
      {/* Background Parallax for Admission Passes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <motion.div style={{ y: bgY }} className="relative w-full h-[130%] -top-[15%]">
          <Image
            src="/images/water-promenade.jpg"
            alt="The Thrills Park Promenade"
            fill
            className="object-cover filter blur-[1px] brightness-75"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14] via-[#050B14]/85 to-[#050B14]" />
      </div>

      {/* Ambient Radial Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-blue-600/10 via-orange-600/10 to-sky-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* A. Header Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-3 font-display">
            <Ticket className="w-3.5 h-3.5" />
            <span>TRANSPARENT ADMISSION TIERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display">
            CHOOSE YOUR ADVENTURE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            All passes include full water park access. Upgrade to the ₹999 Ultra Pass
            for zero queue delays, priority 7D Theatre, and complimentary meals.
          </p>
        </motion.div>

        {/* B. Differential Staggered Elevation for the 2 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {/* Day Thrill Pass (Standard) */}
          {standardPass && (
            <motion.div
              style={{
                y: yStandard,
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
              className="h-full"
            >
              <PricingCard
                pass={standardPass}
                onSelect={(pass) => onSelectPass(pass.id)}
              />
            </motion.div>
          )}

          {/* All-Access Ultra Pass (VIP) */}
          {vipPass && (
            <motion.div
              style={{
                y: yVip,
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
              className="h-full"
            >
              <PricingCard
                pass={vipPass}
                onSelect={(pass) => onSelectPass(pass.id)}
              />
            </motion.div>
          )}
        </div>

        {/* C. Magnetic Tilt & Glow on Assurance Badges */}
        <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          {ASSURANCE_BADGES.map((badge) => (
            <MagneticAssuranceBadge key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
