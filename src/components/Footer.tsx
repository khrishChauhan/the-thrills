"use client";

import React from "react";
import { Shield, Clock, MapPin, Phone, Ticket } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPassViewer: () => void;
  onOpenGateStaff: () => void;
  onSelectCategory?: (category: string) => void;
}

export function Footer({
  onOpenBooking,
  onOpenPassViewer,
  onOpenGateStaff,
  onSelectCategory,
}: FooterProps) {
  const scrollTo = (id: string, category?: string) => {
    if (category && onSelectCategory) onSelectCategory(category);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#03070E] text-slate-400 text-xs border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle Ambient Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pb-8 border-b border-white/[0.06] items-start">
          {/* LEFT COLUMN: Brand Wordmark, Description & Primary Action */}
          <div className="space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                THE THRILLS FUN PARK
              </h4>
              <p className="text-slate-400 font-light text-xs max-w-sm leading-relaxed mt-1">
                Architecturally crafted cinematic entertainment, 8 immersive realms, luxury villas, and water park adventures.
              </p>
            </div>
            {/* Quick Navigation Links */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 flex-wrap">
              <button
                onClick={() => scrollTo("attractions", "All 8 Realms")}
                className="hover:text-white transition-colors"
              >
                Attractions
              </button>
              <span className="text-white/20">·</span>
              <button
                onClick={() => scrollTo("attractions", "Water Park")}
                className="hover:text-white transition-colors"
              >
                Water Park
              </button>
              <span className="text-white/20">·</span>
              <button
                onClick={() => scrollTo("attractions", "Resort & Dining")}
                className="hover:text-white transition-colors"
              >
                Resort &amp; Dining
              </button>
              <span className="text-white/20">·</span>
              <button
                onClick={() => scrollTo("passes")}
                className="hover:text-white transition-colors"
              >
                Admission Passes
              </button>
            </div>
            {/* Action Buttons Row */}
            <div className="pt-1 flex items-center gap-3 flex-wrap">
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.25)] border border-blue-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0A47B8]" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Book Tickets</span>
                  <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-white/10 text-white/90">
                    from ₹699
                  </span>
                </span>
              </button>
              <button
                onClick={onOpenGateStaff}
                className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
              >
                Staff Gate Terminal
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Hours, Location & Guest Services */}
          <div className="space-y-4 md:pl-6 md:border-l md:border-white/[0.06]">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-display mb-2">
                Park Hours &amp; Location
              </div>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Rides: 10:00 AM – 9:00 PM · Water Park: 10:00 AM – 6:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                  <span>Sector 18, Expressway Leisure Corridor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            {/* Digital Pass Shortcut */}
            <div className="pt-1">
              <button
                onClick={onOpenPassViewer}
                className="inline-flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 transition-colors group"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span className="underline underline-offset-4 decoration-sky-500/40 group-hover:decoration-sky-400">
                  Lookup Digital QR Pass
                </span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & COMPLIANCE BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>© 2026 The Thrills Fun Park &amp; Resort. All rights reserved.</div>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>TÜV SÜD International Safety Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
