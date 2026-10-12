"use client";

import React, { useState } from "react";
import { Attraction } from "@/data/attractions";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Navbar } from "@/components/Navbar";
import { BackgroundAtmosphere } from "@/components/BackgroundAtmosphere";
import { AttractionsShowcase } from "@/components/AttractionsShowcase";
import { PassesSection } from "@/components/PassesSection";
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
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans selection:bg-[#0066FF] selection:text-white relative">
      {/* Multi-Plane Atmospheric Background Parallax (Far, Mid, Near planes) */}
      <BackgroundAtmosphere />

      {/* 2.5px Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPassViewer={() => setPassViewerOpen(true)}
        onOpenGateStaff={() => setGateStaffOpen(true)}
        onSelectCategory={(cat) => setSelectedFilter(cat)}
      />

      {/* Main Content with Curtain Reveal Layering */}
      <main className="flex-1 relative z-10">
        {/* SECTION 1: CHOREOGRAPHED ZOOM-IN ENTRY & HORIZONTAL REEL SHOWCASE */}
        <AttractionsShowcase
          selectedFilter={selectedFilter}
          onSelectCategory={(cat) => setSelectedFilter(cat)}
          onOpenSpecs={(attr) => setSelectedAttraction(attr)}
          onBookPass={handleBookFromAttraction}
        />

        {/* SECTION 2: ADMISSION TIERS (#passes) - Staggered Elevation & Moving Border */}
        <PassesSection onSelectPass={(tierId) => handleOpenBooking(tierId)} />
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
