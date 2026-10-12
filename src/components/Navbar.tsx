"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Ticket, ShieldCheck, Menu, X } from "lucide-react";
import { soundEngine } from "@/utils/audio";

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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

  const handleAudioToggle = () => {
    const playing = soundEngine.toggle();
    setIsAudioPlaying(playing);
  };

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
    <header className="fixed top-0 left-0 right-0 z-40 h-[68px] flex items-center bg-[#050B14]/75 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Brand Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center text-left focus:outline-none group shrink-0"
        >
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap group-hover:text-blue-400 transition-colors font-display">
            THE THRILLS
          </span>
        </button>

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

        {/* Right Cluster Controls */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Atmosphere Sound Button */}
          <button
            onClick={handleAudioToggle}
            title={
              isAudioPlaying
                ? "Mute ambient atmosphere sound"
                : "Play luxury park atmosphere"
            }
            className={`p-2 rounded-lg transition-all border ${
              isAudioPlaying
                ? "text-sky-400 bg-sky-500/10 border-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/[0.08]"
            }`}
            aria-label="Toggle ambient atmosphere sound"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {isAudioPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            )}
          </button>

          {/* Ticket Notification Button */}
          <button
            onClick={onOpenPassViewer}
            title="My Booked Digital Passes"
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all"
            aria-label="View digital passes"
          >
            <Ticket className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500]" />
          </button>

          {/* Gate Staff Sleek Minimalist Ghost Pill */}
          <button
            onClick={onOpenGateStaff}
            title="Gate Staff Terminal"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] rounded-lg transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Gate Staff</span>
          </button>

          {/* Anodized Sapphire & Ember Flare CTA Button */}
          <button
            onClick={() => onOpenBooking()}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_25px_rgba(255,85,0,0.35)] border border-blue-400/30 hover:border-orange-500/50"
          >
            {/* Luxury Base: Deep Midnight Sapphire to Electric Cobalt */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0A47B8] transition-opacity duration-300 group-hover:opacity-90" />

            {/* Molten Sunset Ember Edge Glow (Right Perimeter Flare) */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#FF5500]/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Specular Top Glass Inset Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-2">
              <span>Book Tickets</span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90 border border-white/10">
                from ₹699
              </span>
            </span>

            {/* Hover Sheen Sweep */}
            <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[68px] left-0 right-0 border-b border-white/[0.08] bg-[#050B14]/98 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => handleNavClick("attractions", "All 8 Realms")}
              className="text-left text-slate-200 hover:text-white py-2 border-b border-white/[0.05]"
            >
              Attractions (All 8 Realms)
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Water Park")}
              className="text-left text-slate-200 hover:text-white py-2 border-b border-white/[0.05]"
            >
              Water Park: Atlantis Lagoon
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="text-left text-slate-200 hover:text-white py-2 border-b border-white/[0.05]"
            >
              Sanctuary Resort &amp; Villas
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="text-left text-slate-200 hover:text-white py-2 border-b border-white/[0.05]"
            >
              Grand Carousel Bistro
            </button>
            <button
              onClick={() => handleNavClick("passes")}
              className="text-left text-slate-200 hover:text-white py-2 border-b border-white/[0.05]"
            >
              Admission Passes (₹699 / ₹999)
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPassViewer();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.06] text-slate-200 text-sm font-semibold hover:bg-white/[0.1] transition-colors"
            >
              <Ticket className="w-4 h-4 text-[#FF5500]" />
              <span>View My Booked Passes</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGateStaff();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.06] text-slate-200 text-sm font-semibold hover:bg-white/[0.1] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Gate Staff Terminal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] shadow-lg shadow-blue-500/20 text-center"
            >
              Book Passes from ₹699
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
