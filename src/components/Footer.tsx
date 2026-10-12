"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Shield } from "lucide-react";

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
  const scrollToAttractions = (category?: string) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    const elem = document.getElementById("attractions");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPasses = () => {
    const elem = document.getElementById("passes");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#03070E] text-slate-400 text-xs border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle background light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Soft scroll-in parallax curtain reveal */}
      <motion.div
        initial={{ opacity: 0.7, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 will-change-transform"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white font-display">
                  THE THRILLS FUN PARK
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF5500] font-semibold mt-0.5">
                  Cinematic Entertainment Destination
                </span>
              </div>
              <p className="text-slate-400 font-light text-xs max-w-sm leading-relaxed">
                An immersive entertainment and resort destination engineered for
                adrenaline enthusiasts, families, and sensory explorers. Featuring 8
                distinct realms of wonder.
              </p>
            </div>

            <div className="pt-3 flex items-center gap-3 flex-wrap">
              {/* Sapphire Blue CTA Button */}
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 active:scale-[0.98] shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] border border-blue-400/30 hover:border-blue-400/60"
              >
                {/* Deep Midnight Sapphire to Cobalt Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0A47B8] transition-opacity duration-300 group-hover:opacity-95" />

                {/* Specular Top Glass Inset Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

                <span className="relative z-10 flex items-center gap-2">
                  <span>Book Tickets</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90 border border-white/10">
                    from ₹699
                  </span>
                </span>
                {/* Subtle Hover Sheen */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
              </button>
              {/* Minimalist Staff Terminal Button */}
              <button
                onClick={onOpenGateStaff}
                className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.14] transition-all"
              >
                Staff Gate Terminal
              </button>
            </div>
          </div>

          {/* Park Realms */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-display mb-3">
              Park Realms
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToAttractions("Adrenaline")}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Fun Zone &amp; Coasters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Water Park")}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Atlantis Water Park
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Sensory Houses")}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  7D Sensory &amp; Illusions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Resort & Dining")}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Sanctuary Resort Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Resort & Dining")}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Grand Carousel Bistro
                </button>
              </li>
            </ul>
          </div>

          {/* Passes & Guest Services */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-display mb-3">
              Passes &amp; Guest Services
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={scrollToPasses}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Day Thrill Pass (₹699)
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToPasses}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  All-Access Ultra Pass (₹999)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPassViewer}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left flex items-center gap-1.5"
                >
                  <span>View My Digital QR Pass</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGateStaff}
                  className="text-xs text-slate-400 hover:text-white transition-colors duration-200 py-0.5 block text-left"
                >
                  Gate Check-In Console
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-display mb-3">
              Hours &amp; Contact
            </div>
            <div className="space-y-2 text-slate-400 font-light text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Rides: 10:00 AM – 9:00 PM
                  <br />
                  Water Park: 10:00 AM – 6:30 PM
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                <span>Sector 18, Expressway Leisure Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>© 2026 The Thrills Fun Park &amp; Resort. All rights reserved.</div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>TÜV SÜD International Amusement Safety Compliance</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
