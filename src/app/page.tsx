"use client";

import React, { useState } from "react";
import { Ticket, Zap, Shield } from "lucide-react";
import { Attraction } from "@/data/attractions";
import { PASSES, ASSURANCE_BADGES, PassTier } from "@/data/passes";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Navbar } from "@/components/Navbar";
import { AttractionsShowcase } from "@/components/AttractionsShowcase";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";
import { BookingModal, BookedTicket } from "@/components/BookingModal";
import { DigitalPassModal } from "@/components/DigitalPassModal";
import { GateValidatorModal } from "@/components/GateValidatorModal";
import { AttractionModal } from "@/components/AttractionModal";

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All 8 Realms");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialTierId, setInitialTierId] = useState<string>("all-access-ultra");
  const [passViewerOpen, setPassViewerOpen] = useState(false);
  const [gateStaffOpen, setGateStaffOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [bookedTicket, setBookedTicket] = useState<BookedTicket | null>(null);

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
        onSelectCategory={(cat) => setSelectedFilter(cat)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* SECTION 1: CHOREOGRAPHED ZOOM-IN ENTRY & HORIZONTAL REEL SHOWCASE */}
        <AttractionsShowcase
          selectedFilter={selectedFilter}
          onSelectCategory={(cat) => setSelectedFilter(cat)}
          onOpenSpecs={(attr) => setSelectedAttraction(attr)}
          onBookPass={handleBookFromAttraction}
        />

        {/* SECTION 2: ADMISSION TIERS (#passes) - Natural vertical scroll hand-off */}
        <section
          id="passes"
          className="py-28 sm:py-36 bg-[#050B14] relative overflow-hidden"
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
      </main>

      {/* Cinematic Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPassViewer={() => setPassViewerOpen(true)}
        onOpenGateStaff={() => setGateStaffOpen(true)}
        onSelectCategory={(cat) => setSelectedFilter(cat)}
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
