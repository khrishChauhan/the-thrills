'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxCardImageProps {
  src: string;
  alt: string;
  badgeTopLeft?: string;
  badgeBottomRight?: string;
  accentColor?: string; // e.g. '#0066FF', '#FF5500', '#00D2FF', '#DC2626'
}

/**
 * Parallax Card Image Component
 * Multi-layered parallax depth, cinematic dark gradient overlays,
 * ambient accent color tint, and hardware-accelerated scroll scaling.
 */
export function ParallaxCardImage({
  src,
  alt,
  badgeTopLeft,
  badgeBottomRight,
  accentColor = '#0066FF',
}: ParallaxCardImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle internal parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.08, 1.12]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#0A1118] group"
    >
      {/* Parallax Image Layer */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
      </motion.div>

      {/* Cinematic Luxury Overlays (Ensures high-contrast text and UI badges) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/70 via-transparent to-[#050B14]/30 pointer-events-none" />

      {/* Ambient Accent Tint */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-color pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top Left Badge */}
      {badgeTopLeft && (
        <div className="absolute top-3.5 left-3.5 z-20">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#050B14]/85 text-white border border-white/10 backdrop-blur-md shadow-lg">
            {badgeTopLeft}
          </span>
        </div>
      )}

      {/* Bottom Right Schedule Badge */}
      {badgeBottomRight && (
        <div className="absolute bottom-3.5 right-3.5 z-20">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#050B14]/85 text-sky-400 border border-white/10 backdrop-blur-md">
            {badgeBottomRight}
          </span>
        </div>
      )}
    </div>
  );
}
