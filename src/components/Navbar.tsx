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
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#050B14]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#FF5500] flex items-center justify-center p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#050B14] rounded-[6px] flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent font-display">
                  TP
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap group-hover:text-blue-400 transition-colors font-display">
                THE THRILLS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick("attractions", "All 8 Realms")}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white ${
                activeSection === "attractions" ? "text-white font-semibold" : "text-slate-300"
              }`}
            >
              Attractions
              {activeSection === "attractions" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#FF5500] rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Water Park")}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white text-slate-300"
            >
              Water Park
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white text-slate-300"
            >
              Resort
            </button>
            <button
              onClick={() => handleNavClick("attractions", "Resort & Dining")}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white text-slate-300"
            >
              Dining
            </button>
            <button
              onClick={() => handleNavClick("passes")}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white ${
                activeSection === "passes" ? "text-white font-semibold" : "text-slate-300"
              }`}
            >
              Passes
              {activeSection === "passes" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#FF5500] rounded-full" />
              )}
            </button>
          </nav>

          {/* Utility Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Atmosphere Toggle */}
            <button
              onClick={handleAudioToggle}
              title={
                isAudioPlaying
                  ? "Mute ambient atmosphere sound"
                  : "Play luxury park atmosphere"
              }
              className={`p-2 rounded-lg transition-colors relative ${
                isAudioPlaying
                  ? "text-sky-400 bg-sky-500/10 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
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

            {/* Digital Passes Button */}
            <button
              onClick={onOpenPassViewer}
              title="My Booked Digital Passes"
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF5500]" />
            </button>

            {/* Gate Staff Button */}
            <button
              onClick={onOpenGateStaff}
              title="Gate Ticket Validator"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition-colors border border-transparent hover:border-white/[0.08]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Gate Staff</span>
            </button>

            {/* Gradient CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#FF5500] shadow-[0_0_20px_rgba(0,102,255,0.35)] hover:shadow-[0_0_25px_rgba(255,85,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book Tickets
                <span className="text-white/80 font-normal">from ₹699</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#050B14]/98 backdrop-blur-2xl px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3 text-base font-medium">
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
              <ShieldCheck className="w-4 h-4 text-blue-400" />
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
