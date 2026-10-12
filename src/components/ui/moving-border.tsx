"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderContainerProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}

/**
 * Aceternity-style Radiant Moving Border Container
 * Continuously cycles a glowing gradient around the border perimeter
 * using hardware-accelerated conic gradient rotation.
 */
export function MovingBorderContainer({
  children,
  duration = 6,
  className,
  containerClassName,
  borderClassName,
}: MovingBorderContainerProps) {
  return (
    <div
      className={cn(
        "relative p-[1.5px] overflow-hidden rounded-3xl",
        containerClassName
      )}
    >
      {/* 360-degree rotating conic gradient beam */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-[-150%] bg-[conic-gradient(from_0deg_at_50%_50%,#0066FF_0deg,#38BDF8_90deg,#FF5500_180deg,#38BDF8_270deg,#0066FF_360deg)] opacity-95",
          borderClassName
        )}
        style={{
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear",
        }}
      />
      {/* Inner card container matching the border curvature */}
      <div
        className={cn(
          "relative rounded-[calc(1.5rem-1.5px)] h-full w-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
