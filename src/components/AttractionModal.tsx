"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles, Shield, Clock, Ruler, Gauge, ArrowRight } from "lucide-react";
import { Attraction } from "@/data/attractions";

interface AttractionModalProps {
  attraction: Attraction | null;
  isOpen: boolean;
  onClose: () => void;
  onBookPass: (attraction: Attraction) => void;
}

export function AttractionModal({
  attraction,
  isOpen,
  onClose,
  onBookPass,
}: AttractionModalProps) {
  if (!isOpen || !attraction) return null;

  const specEntries = Object.entries(attraction.specs);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050B14]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-3xl bg-[#080E1A] border border-white/[0.15] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto pr-2 space-y-6">
          {/* Header Banner */}
          <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0A1118]">
            <Image
              src={attraction.image}
              alt={attraction.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080E1A]/70 via-transparent to-[#080E1A]/40 pointer-events-none" />
            <div
              className="absolute inset-0 opacity-20 mix-blend-color pointer-events-none"
              style={{ backgroundColor: attraction.accentColor }}
            />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#050B14]/85 text-white border border-white/10 backdrop-blur-md">
                  {attraction.tagBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 font-display">
                  {attraction.title}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#050B14]/80 text-sky-400 border border-white/10">
                {attraction.scheduleBadge}
              </span>
            </div>
          </div>

          {/* Subtitle & Story */}
          <div>
            <div className="text-sm sm:text-base font-semibold text-[#FF5500] mb-2 font-display">
              {attraction.subtitle}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {attraction.description}
            </p>
          </div>

          {/* Core Ride Quick Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <Gauge className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Intensity</div>
                <div className="text-xs font-bold text-white mt-0.5">{attraction.intensity}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <Ruler className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Min Height</div>
                <div className="text-xs font-bold text-white mt-0.5">{attraction.minHeight}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Duration</div>
                <div className="text-xs font-bold text-white mt-0.5">{attraction.duration}</div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {specEntries.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold font-display">
                Engineering &amp; Sensory Specifications
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#050B14] divide-y divide-white/[0.06] overflow-hidden text-xs">
                {specEntries.map(([key, val]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-1">
                    <span className="text-slate-400 font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-white font-semibold sm:text-right font-mono">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety & Compliance */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-white">TÜV SÜD Amusement Compliance Certified</span>
              <p className="text-slate-300 mt-0.5 font-light">
                This attraction undergoes daily computer diagnostics, mechanical brake-run checks, and emergency fail-safe audits.
              </p>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            >
              Close Overview
            </button>
            <button
              onClick={() => {
                onClose();
                onBookPass(attraction);
              }}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/25 flex items-center gap-2 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Pass to {attraction.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
