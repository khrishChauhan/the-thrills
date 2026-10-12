"use client";

import React, { useState } from "react";
import { X, Check, Calendar, Users, Sparkles, Shield, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { PASSES, PassTier } from "@/data/passes";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
  onBookingComplete: (ticketData: BookedTicket) => void;
}

export interface BookedTicket {
  id: string;
  ticketCode: string;
  passTier: PassTier;
  guestCount: number;
  visitDate: string;
  guestName: string;
  guestPhone: string;
  totalAmount: number;
  bookedAt: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialTierId = "all-access-ultra",
  onBookingComplete,
}: BookingModalProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>(initialTierId);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [visitDate, setVisitDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  });
  const [guestName, setGuestName] = useState<string>("Alex Rivera");
  const [guestPhone, setGuestPhone] = useState<string>("+91 98765 43210");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentTier =
    PASSES.find((p) => p.id === selectedTierId) || PASSES[1];
  const totalPrice = currentTier.price * guestCount;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0066FF", "#38BDF8", "#FF5500", "#FFAA00"],
      });
    } catch {
      // ignore
    }

    const ticketCode = `THR-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: BookedTicket = {
      id: "ticket-" + Date.now(),
      ticketCode,
      passTier: currentTier,
      guestCount,
      visitDate,
      guestName: guestName.trim() || "Guest",
      guestPhone: guestPhone.trim() || "+91 98765 43210",
      totalAmount: totalPrice,
      bookedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onBookingComplete(newTicket);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050B14]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#080E1A]/95 border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-slate-100 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-600/20 via-orange-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5500] mb-2 font-display">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSTANT ADMISSION CHECKOUT</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6 font-display">
          Reserve Park Pass
        </h2>

        <form onSubmit={handleConfirm} className="space-y-6">
          {/* Tier Selection Radio Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PASSES.map((tier) => {
              const isSelected = tier.id === selectedTierId;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 relative ${
                    isSelected
                      ? "bg-gradient-to-b from-[#0F1E36] to-[#091322] border-blue-500 shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                      : "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-semibold text-slate-400">
                      {tier.subtitle}
                    </span>
                    {tier.isPopular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-gradient-to-r from-[#0066FF] to-[#FF5500] text-white">
                        VIP Choice
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-white text-base mb-1 font-display">
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">
                      ₹{tier.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{tier.originalPrice}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Save ₹{tier.savings}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Date & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Visit Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full bg-[#050B14] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Number of Guests
              </label>
              <div className="flex items-center bg-[#050B14] border border-white/[0.1] rounded-xl px-4 py-2 justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold text-white">{guestCount} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Primary Guest Name
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#050B14] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Phone Number (for SMS QR Pass)
              </label>
              <input
                type="tel"
                required
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#050B14] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Total Admission Due</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-0.5">
                ₹{totalPrice}
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div>{guestCount} × ₹{currentTier.price}</div>
              <div className="text-emerald-400 font-medium">Taxes &amp; Water Park Included</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#FF5500] hover:shadow-[0_0_25px_rgba(255,85,0,0.4)] shadow-[0_0_20px_rgba(0,102,255,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span>Generating Secure QR Pass...</span>
            ) : (
              <>
                <span>Confirm &amp; Generate Instant QR Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free cancellation &amp; rescheduling up to 2 hours before gate opening.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
