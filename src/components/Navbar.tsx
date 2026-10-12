"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (initialTierId?: string) => void;
  onOpenPassViewer: () => void;
  onOpenGateStaff: () => void;
  onSelectCategory?: (category: string) => void;
}

export function Navbar({
  onOpenBooking,
  onOpenPassViewer,
  onOpenGateStaff,
  onSelectCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("attractions");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const passesElem = document.getElementById("passes");
      if (passesElem && scrollY >= passesElem.offsetTop - 200) {
        setActiveSection("passes");
      } else {
        setActiveSection("attractions");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    setMobileMenuOpen(false);
    if (categoryFilter && onSelectCategory) {
      onSelectCategory(categoryFilter);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[68px] flex items-center bg-[#050B14]/75 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Left Cluster: Mobile Hamburger Button + Brand Name */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Wordmark */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-left focus:outline-none group shrink-0"
            >
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap group-hover:text-blue-400 transition-colors font-display">
                THE THRILLS
              </span>
            </button>
          </div>

          {/* Center Nav Links with Refined 2px Glowing Micro-Indicator */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-medium tracking-wide">
            <button
              onClick={() => handleNavClick("attractions", "All 8 Realms")}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                activeSection === "attractions"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Attractions</span>
              {activeSection === "attractions" && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Water Park")}
              className="relative py-1 whitespace-nowrap shrink-0 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <span>Water Park</span>
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="relative py-1 whitespace-nowrap shrink-0 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <span>Resort</span>
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="relative py-1 whitespace-nowrap shrink-0 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <span>Dining</span>
            </button>
            <button
              onClick={() => handleNavClick("passes")}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                activeSection === "passes"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Passes</span>
              {activeSection === "passes" && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
              )}
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Anodized Sapphire & Ember Flare CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_25px_rgba(255,85,0,0.35)] border border-blue-400/30 hover:border-orange-500/50"
            >
              {/* Luxury Base: Deep Midnight Sapphire to Electric Cobalt */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0A47B8] transition-opacity duration-300 group-hover:opacity-90" />

              {/* Molten Sunset Ember Edge Glow (Right Perimeter Flare) */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#FF5500]/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Specular Top Glass Inset Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <span>Book Tickets</span>
                <span className="text-[10px] sm:text-[11px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-white/10 text-white/90 border border-white/10">
                  from ₹699
                </span>
              </span>

              {/* Hover Sheen Sweep */}
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* 1. Dark Backdrop Overlay (Dims out the background page completely) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />
            {/* 2. Solid Left Slide-Over Drawer (100% OPAQUE bg-[#050B14], NOT TRANSPARENT) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[85vw] max-w-[340px] h-full bg-[#050B14] border-r border-white/[0.1] shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto md:hidden"
            >
              {/* Drawer Header (Logo + Close Button) */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-black tracking-tight text-white font-display">
                      THE THRILLS
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF5500]">
                      Cinematic Fun Park
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Navigation Links (Clean, Spacious, Touch-Friendly) */}
                <nav className="flex flex-col space-y-1">
                  {[
                    { label: "Attractions (All 8 Realms)", sec: "attractions", cat: "All 8 Realms" },
                    { label: "Water Park: Atlantis Lagoon", sec: "attractions", cat: "Water Park" },
                    { label: "Sanctuary Resort & Villas", sec: "attractions", cat: "Resort & Dining" },
                    { label: "Grand Carousel Bistro", sec: "attractions", cat: "Resort & Dining" },
                    { label: "Admission Passes", sec: "passes" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick(item.sec, item.cat);
                      }}
                      className="w-full text-left py-3 px-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <span className="text-slate-500 group-hover:text-[#FF5500] text-xs transition-colors">→</span>
                    </button>
                  ))}
                </nav>
              </div>
              {/* Drawer Footer Actions (Solid, Stacked Buttons) */}
              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPassViewer();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/[0.06] transition-all"
                >
                  <Ticket className="w-4 h-4 text-[#FF5500]" />
                  <span>View My Booked Passes</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGateStaff();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/[0.06] transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Gate Staff Terminal</span>
                </button>
                {/* Sapphire Blue Primary CTA */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0A47B8] shadow-lg shadow-blue-500/25 border border-blue-400/30 text-center"
                >
                  Book Passes from ₹699
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
