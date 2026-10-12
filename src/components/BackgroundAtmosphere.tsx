"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Multi-Plane Atmospheric Background Parallax
 * Persistent lightweight background layer behind the entire page that reacts to global scroll depth.
 * Features 3 independent depth planes:
 * - Far Plane: Deep Blue Nebula (blur-[180px] bg-[#0066FF]/10)
 * - Mid Plane: Warm Flare Ember (blur-[160px] bg-[#FF5500]/10)
 * - Near Plane: Subtle 24px Blueprint Grid (opacity: 0.15)
 * All planes use GPU acceleration and fall back gracefully on mobile for 60fps.
 */
export function BackgroundAtmosphere() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll();

  // Plane 1: Far Plane (Deep Blue Nebula)
  const yFar = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -150]
  );

  // Plane 2: Mid Plane (Warm Flare Ember)
  const yMid = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -320]
  );

  // Plane 3: Near Plane (Subtle Blueprint Grid)
  const yNear = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -80]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. Far Plane: Deep Blue Nebula Orb */}
      <motion.div
        style={{
          y: yFar,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-[#0066FF]/10 blur-[180px]"
      />

      {/* 2. Mid Plane: Warm Flare Ember Orb */}
      <motion.div
        style={{
          y: yMid,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="absolute top-1/2 -right-36 w-[640px] h-[640px] rounded-full bg-[#FF5500]/10 blur-[160px]"
      />

      {/* 3. Near Plane: 24px Blueprint Grid Pattern */}
      <motion.div
        style={{
          y: yNear,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="absolute -top-24 inset-x-0 h-[160vh] w-full [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-15"
      />
    </div>
  );
}
