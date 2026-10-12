"use client";

import React, { useState } from "react";
import { Sparkles, Ticket, Zap, Shield } from "lucide-react";
import { ATTRACTIONS, Attraction } from "@/data/attractions";
import { PASSES, ASSURANCE_BADGES, PassTier } from "@/data/passes";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Navbar } from "@/components/Navbar";
import { AttractionCard } from "@/components/AttractionCard";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";
import { BookingModal, BookedTicket } from "@/components/BookingModal";
import { DigitalPassModal } from "@/components/DigitalPassModal";
import { GateValidatorModal } from "@/components/GateValidatorModal";
import { AttractionModal } from "@/components/AttractionModal";

const FILTER_CATEGORIES = [
  "All 8 Realms",
  "Adrenaline",
  "Sensory Houses",
  "Water Park",
  "Resort & Dining",
] as const;

type CategoryFilter = (typeof FILTER_CATEGORIES)[number];

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All 8 Realms");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialTierId, setInitialTierId] = useState<string>("all-access-ultra");
  const [passViewerOpen, setPassViewerOpen] = useState(false);
  const [gateStaffOpen, setGateStaffOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [bookedTicket, setBookedTicket] = useState<BookedTicket | null>(null);

  // Filter logic
  const filteredAttractions =
    selectedFilter === "All 8 Realms"
      ? ATTRACTIONS
      : ATTRACTIONS.filter((attr) => attr.category === selectedFilter);

  const handleOpenBooking = (tierId?: string) => {
    if (tierId) setInitialTierId(tierId);
    setBookingOpen(true);
  };

  const handleBookingComplete = (ticket: BookedTicket) => {
    setBookedTicket(ticket);
    setBookingOpen(false);
    setPassViewerOpen(true);
  };

  const handleBookFromAttraction = (attraction: Attraction) => {
    // If it's 7D Theatre or Sensory, recommend All-Access Ultra Pass, otherwise Day Thrill
    if (
      attraction.category === "Sensory Houses" ||
      attraction.id === "theatre-7d"
    ) {
      setInitialTierId("all-access-ultra");
    } else {
      setInitialTierId("day-thrill");
    }
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* 2.5px Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPassViewer={() => setPassViewerOpen(true)}
        onOpenGateStaff={() => setGateStaffOpen(true)}
        onSelectCategory={(cat) => {
          if (FILTER_CATEGORIES.includes(cat as CategoryFilter)) {
            setSelectedFilter(cat as CategoryFilter);
          }
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        <div className="pt-16">
          {/* SECTION 1: WORLD-CLASS ATTRACTIONS */}
          <section
            id="attractions"
            className="py-24 sm:py-32 bg-[#050B14] relative overflow-hidden"
          >
            {/* Ambient Lighting Glows */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-orange-600/10 blur-[160px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-3 font-display">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THE 8 CINEMATIC REALMS</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display">
                    WORLD-CLASS ATTRACTIONS
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
                    Architecturally crafted entertainment environments designed to spark
                    awe, elevate pulses, and redefine physical and sensory thrills.
                  </p>
                </div>

                {/* Filter Pill Bar */}
                <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
                  {FILTER_CATEGORIES.map((filter) => {
                    const isActive = selectedFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                          isActive
                            ? "bg-gradient-to-r from-[#0066FF] to-[#FF5500] text-white shadow-md shadow-blue-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alternating Attraction Cards Showcase */}
              <div className="space-y-16 sm:space-y-24">
                {filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    id={`attraction-${attraction.id}`}
                    className="scroll-mt-28"
                  >
                    <AttractionCard
                      attraction={attraction}
                      onOpenSpecs={(attr) => setSelectedAttraction(attr)}
                      onBookPass={handleBookFromAttraction}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: ADMISSION TIERS (#passes) */}
          <section
            id="passes"
            className="py-24 sm:py-32 bg-[#050B14] relative overflow-hidden"
          >
            {/* Ambient Radial Backlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/10 via-orange-600/10 to-sky-600/10 blur-[180px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF5500] mb-3 font-display">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>TRANSPARENT ADMISSION TIERS</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display">
                  CHOOSE YOUR ADVENTURE
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                  All passes include full water park access. Upgrade to the ₹999 Ultra Pass
                  for zero queue delays, priority 7D Theatre, and complimentary meals.
                </p>
              </div>

              {/* Side-by-Side Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
                {PASSES.map((pass) => (
                  <PricingCard
                    key={pass.id}
                    pass={pass}
                    onSelect={(p: PassTier) => handleOpenBooking(p.id)}
                  />
                ))}
              </div>

              {/* Three Assurance Badges */}
              <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                {ASSURANCE_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 transition-colors hover:bg-white/[0.04]"
                  >
                    {badge.icon === "zap" && (
                      <Zap className={`w-5 h-5 ${badge.colorClass} shrink-0`} />
                    )}
                    {badge.icon === "shield" && (
                      <Shield className={`w-5 h-5 ${badge.colorClass} shrink-0`} />
                    )}
                    {badge.icon === "ticket" && (
                      <Ticket className={`w-5 h-5 ${badge.colorClass} shrink-0`} />
                    )}
                    <div className="text-xs">
                      <div className="font-semibold text-white">{badge.title}</div>
                      <div className="text-slate-400">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Cinematic Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPassViewer={() => setPassViewerOpen(true)}
        onOpenGateStaff={() => setGateStaffOpen(true)}
        onSelectCategory={(cat) => {
          if (FILTER_CATEGORIES.includes(cat as CategoryFilter)) {
            setSelectedFilter(cat as CategoryFilter);
          }
        }}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialTierId={initialTierId}
        onBookingComplete={handleBookingComplete}
      />

      <DigitalPassModal
        isOpen={passViewerOpen}
        onClose={() => setPassViewerOpen(false)}
        ticket={bookedTicket}
        onBookAnother={() => setBookingOpen(true)}
      />

      <GateValidatorModal
        isOpen={gateStaffOpen}
        onClose={() => setGateStaffOpen(false)}
      />

      <AttractionModal
        attraction={selectedAttraction}
        isOpen={selectedAttraction !== null}
        onClose={() => setSelectedAttraction(null)}
        onBookPass={handleBookFromAttraction}
      />
    </div>
  );
}
