"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PassTier } from "@/data/passes";
import { MovingBorderContainer } from "@/components/ui/moving-border";

interface PricingCardProps {
  pass: PassTier;
  onSelect: (pass: PassTier) => void;
}

const checklistContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const checklistItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function PricingCard({ pass, onSelect }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flashlight, setFlashlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFlashlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setFlashlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 overflow-hidden ${
        pass.isPopular
          ? "bg-gradient-to-b from-[#0F1E36] via-[#091322] to-[#050B14]"
          : "bg-[#080E1A]/85 border border-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)]"
      }`}
    >
      <div>
        {/* Top Subheader & Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            {pass.subtitle}
          </span>
          {pass.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#0066FF] to-[#FF5500] text-white shadow-md">
              {pass.badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          {pass.name}
        </h3>
        <p className="text-sm text-slate-300 font-light mt-2 mb-6">
          {pass.description}
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/[0.08]">
          <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
            ₹{pass.price}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ₹{pass.originalPrice}
          </span>
          <span className="text-xs text-emerald-400 font-semibold ml-2">
            Save ₹{pass.savings}
          </span>
          <span className="text-xs text-slate-400 block sm:inline ml-auto">
            {pass.periodText}
          </span>
        </div>

        {/* Checklist Items with Sequential Staggered Entry */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
            {pass.featuresHeader}
          </div>
          <motion.div
            variants={checklistContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="space-y-3"
          >
            {pass.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={checklistItemVariants}
                className="flex items-start gap-3 text-xs sm:text-sm text-slate-200"
              >
                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-sky-400" />
                </div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Action button */}
      <div className="pt-4 border-t border-white/[0.08]">
        {pass.isPopular ? (
          <button
            type="button"
            className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#FF5500] text-white shadow-blue-500/25 hover:shadow-orange-500/35 hover:scale-[1.01] active:scale-[0.98]"
          >
            <span>{pass.buttonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] active:scale-[0.98]"
          >
            <span>{pass.buttonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Mouse-following radial flashlight effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          opacity: flashlight.opacity,
          background: `radial-gradient(400px circle at ${flashlight.x}px ${flashlight.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
      />
    </div>
  );

  return (
    <div
      onClick={() => onSelect(pass)}
      className="cursor-pointer flex flex-col group h-full"
    >
      {pass.isPopular ? (
        <MovingBorderContainer
          containerClassName="h-full shadow-[0_0_50px_rgba(0,102,255,0.3)] hover:shadow-[0_0_70px_rgba(255,85,0,0.4)] transition-shadow duration-300"
          className="h-full"
        >
          {cardContent}
        </MovingBorderContainer>
      ) : (
        cardContent
      )}
    </div>
  );
}
