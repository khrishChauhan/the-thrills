"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis Momentum Smooth Scroll Provider
 * Glides all vertical scrolling, horizontal reels, and parallax transforms
 * with luxurious fluid inertia and sub-pixel precision.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smooth gliding duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true, // Intercept chunky mouse wheel ticks into liquid inertia
      wheelMultiplier: 1.0, // Natural, responsive speed
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
