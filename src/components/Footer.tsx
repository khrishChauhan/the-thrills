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
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#FF5500] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#050B14] rounded-[6px] flex items-center justify-center">
                  <span className="font-extrabold text-sm text-white font-display">TP</span>
                </div>
              </div>
              <span className="text-base font-extrabold tracking-tight text-white font-display">
                THE THRILLS FUN PARK
              </span>
            </div>

            <p className="text-slate-400 font-light max-w-sm leading-relaxed">
              An immersive entertainment and resort destination engineered for
              adrenaline enthusiasts, families, and sensory explorers. Featuring 8
              distinct realms of wonder.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-lg font-bold text-xs text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                Book Tickets from ₹699
              </button>
              <button
                onClick={onOpenGateStaff}
                className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              >
                Staff Gate Terminal
              </button>
            </div>
          </div>

          {/* Park Realms */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-display">
              Park Realms
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToAttractions("Adrenaline")}
                  className="hover:text-white transition-colors text-left"
                >
                  Fun Zone &amp; Coasters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Water Park")}
                  className="hover:text-white transition-colors text-left"
                >
                  Atlantis Water Park
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Sensory Houses")}
                  className="hover:text-white transition-colors text-left"
                >
                  7D Sensory &amp; Illusions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Resort & Dining")}
                  className="hover:text-white transition-colors text-left"
                >
                  Sanctuary Resort Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAttractions("Resort & Dining")}
                  className="hover:text-white transition-colors text-left"
                >
                  Grand Carousel Bistro
                </button>
              </li>
            </ul>
          </div>

          {/* Passes & Guest Services */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-display">
              Passes &amp; Guest Services
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={scrollToPasses}
                  className="hover:text-white transition-colors text-left"
                >
                  Day Thrill Pass (₹699)
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToPasses}
                  className="hover:text-white transition-colors text-left"
                >
                  All-Access Ultra Pass (₹999)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPassViewer}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <span>View My Digital QR Pass</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGateStaff}
                  className="hover:text-white transition-colors text-left"
                >
                  Gate Check-In Console
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-display">
              Hours &amp; Contact
            </div>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Rides: 10:00 AM – 9:00 PM
                  <br />
                  Water Park: 10:00 AM – 6:30 PM
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <span>Sector 18, Expressway Leisure Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>© 2026 The Thrills Fun Park &amp; Resort. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>TÜV SÜD International Amusement Safety Compliance</span>
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
