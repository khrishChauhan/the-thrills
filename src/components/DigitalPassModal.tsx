"use client";

import React, { useState } from "react";
import { X, QrCode, CheckCircle2, Zap, ArrowRight, Shield, Download, Sparkles } from "lucide-react";
import { BookedTicket } from "./BookingModal";

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: BookedTicket | null;
  onBookAnother: () => void;
}

export function DigitalPassModal({
  isOpen,
  onClose,
  ticket,
  onBookAnother,
}: DigitalPassModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Fallback demo ticket if user hasn't booked one yet
  const activeTicket: BookedTicket = ticket || {
    id: "demo-pass",
    ticketCode: "THR-VIP-8842",
    passTier: {
      id: "all-access-ultra",
      name: "All-Access Ultra Pass",
      subtitle: "Premium VIP Experience",
      price: 999,
      originalPrice: 1499,
      savings: 500,
      periodText: "per guest · all day",
      description: "The definitive VIP experience with zero wait fast-track.",
      featuresHeader: "Included",
      features: [],
      buttonText: "",
      isPopular: true,
    },
    guestCount: 2,
    visitDate: "Today · Active",
    guestName: "Khrish Chauhan",
    guestPhone: "+91 98765 43210",
    totalAmount: 1998,
    bookedAt: "Just now",
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050B14]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-md bg-[#080E1A] border border-white/[0.15] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-slate-100 overflow-hidden">
        {/* Holographic light gradient bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#FF5500]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pass Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#FF5500] flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#050B14] rounded-[5px] flex items-center justify-center">
              <span className="font-extrabold text-xs text-white">TP</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white font-display">
              THE THRILLS
            </div>
            <div className="text-[10px] text-slate-400">Digital RFID Smart Pass</div>
          </div>
        </div>

        {/* Digital Ticket Card */}
        <div className="relative rounded-2xl bg-[#050B14] border border-white/[0.1] p-5 mb-5 overflow-hidden">
          {/* Glowing scanner sweep line animation */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-pulse pointer-events-none top-1/2" />

          {/* Ticket Tier Info */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/30">
                {activeTicket.passTier.name}
              </span>
              <div className="text-lg font-extrabold text-white mt-1 font-display">
                {activeTicket.guestName}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONFIRMED</span>
              </span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {activeTicket.guestCount} Guest{activeTicket.guestCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Simulated QR Code Box */}
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center shadow-lg my-3">
            <svg
              className="w-40 h-40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* QR Pattern Simulation */}
              <rect width="100" height="100" fill="white" />
              {/* Corners */}
              <rect x="10" y="10" width="24" height="24" fill="#050B14" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" fill="#0066FF" />

              <rect x="66" y="10" width="24" height="24" fill="#050B14" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" fill="#FF5500" />

              <rect x="10" y="66" width="24" height="24" fill="#050B14" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" fill="#0066FF" />

              {/* Data modules */}
              <rect x="42" y="14" width="6" height="6" fill="#050B14" />
              <rect x="52" y="14" width="6" height="6" fill="#050B14" />
              <rect x="42" y="24" width="6" height="6" fill="#050B14" />
              <rect x="46" y="34" width="8" height="8" fill="#050B14" />
              <rect x="14" y="44" width="6" height="6" fill="#050B14" />
              <rect x="24" y="44" width="6" height="6" fill="#050B14" />
              <rect x="34" y="44" width="6" height="6" fill="#050B14" />
              <rect x="44" y="44" width="12" height="12" fill="#0066FF" />
              <rect x="60" y="44" width="6" height="6" fill="#050B14" />
              <rect x="70" y="44" width="6" height="6" fill="#050B14" />
              <rect x="80" y="44" width="6" height="6" fill="#050B14" />
              <rect x="14" y="54" width="6" height="6" fill="#050B14" />
              <rect x="34" y="54" width="6" height="6" fill="#050B14" />
              <rect x="64" y="54" width="6" height="6" fill="#FF5500" />
              <rect x="74" y="54" width="6" height="6" fill="#050B14" />
              <rect x="44" y="64" width="6" height="6" fill="#050B14" />
              <rect x="54" y="64" width="6" height="6" fill="#050B14" />
              <rect x="64" y="64" width="6" height="6" fill="#050B14" />
              <rect x="74" y="64" width="6" height="6" fill="#050B14" />
              <rect x="84" y="64" width="6" height="6" fill="#050B14" />
              <rect x="44" y="74" width="6" height="6" fill="#050B14" />
              <rect x="54" y="74" width="6" height="6" fill="#050B14" />
              <rect x="64" y="74" width="6" height="6" fill="#050B14" />
              <rect x="74" y="74" width="6" height="6" fill="#050B14" />
              <rect x="84" y="74" width="6" height="6" fill="#050B14" />
            </svg>
            <div className="font-mono text-xs font-black tracking-widest text-slate-900 mt-1">
              {activeTicket.ticketCode}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/[0.08]">
            <div>
              <span className="text-slate-400 block text-[10px]">VISIT DATE</span>
              <span className="font-semibold text-white">{activeTicket.visitDate}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">TOTAL PAID</span>
              <span className="font-mono font-bold text-sky-400">
                ₹{activeTicket.totalAmount}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">GATE ACCESS</span>
              <span className="font-semibold text-emerald-400">Turnstiles 1 – 8</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">FAST-TRACK</span>
              <span className="font-semibold text-[#FF5500]">
                {activeTicket.passTier.id === "all-access-ultra"
                  ? "Unlimited Active"
                  : "Standard Queue"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>
              {downloadSuccess
                ? "Pass Saved to Offline Storage!"
                : "Save Offline Wallet Pass"}
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBookAnother();
            }}
            className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#FF5500] hover:opacity-95 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Additional Pass</span>
          </button>
        </div>

        <div className="mt-4 text-center text-[11px] text-slate-500">
          Present this QR code directly at the automated turnstiles or RFID kiosk.
        </div>
      </div>
    </div>
  );
}
