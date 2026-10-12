"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Scan, KeyRound } from "lucide-react";

interface GateValidatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GateValidatorModal({ isOpen, onClose }: GateValidatorModalProps) {
  const [ticketInput, setTicketInput] = useState("THR-VIP-8842");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "valid" | "invalid">("idle");
  const [turnstileLogs, setTurnstileLogs] = useState([
    { id: 1, time: "14:38:12", code: "THR-VIP-8842", status: "VALID", gate: "Turnstile 04" },
    { id: 2, time: "14:36:45", code: "THR-DAY-4109", status: "VALID", gate: "Turnstile 02" },
    { id: 3, time: "14:35:10", code: "THR-VIP-1920", status: "VALID", gate: "Turnstile 01" },
  ]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      const code = ticketInput.trim().toUpperCase();
      if (code.length > 3) {
        setScanState("valid");
        setTurnstileLogs((prev) => [
          {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            code,
            status: "VALID",
            gate: "Turnstile 04",
          },
          ...prev.slice(0, 5),
        ]);
      } else {
        setScanState("invalid");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050B14]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-xl bg-[#080E1A] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,102,255,0.2)] z-10 my-auto text-slate-100 overflow-hidden">
        {/* Top glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 font-display">
              SECURITY &amp; ADMISSION GATE TERMINAL
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Turnstile Console #04
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6 font-light">
          Live gate validation node linked to The Thrills central admission server.
        </p>

        {/* Live Terminal Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Gate Status</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Today Scans</div>
            <div className="text-sm font-black text-white font-mono mt-0.5">2,841 Pass</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">TÜV Safety</div>
            <div className="text-sm font-bold text-sky-400 mt-0.5">COMPLIANT</div>
          </div>
        </div>

        {/* Scanner Simulation Box */}
        <div className="p-5 rounded-2xl bg-[#050B14] border border-white/[0.1] mb-6 space-y-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Simulate QR / RFID Scan or Manual Code
          </label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder="Scan or enter THR-XXX-XXXX"
                className="w-full bg-[#080E1A] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500 uppercase"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>

            <button
              onClick={handleSimulateScan}
              disabled={scanState === "scanning"}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#38BDF8] hover:opacity-90 shadow-md shadow-blue-500/20 flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all"
            >
              {scanState === "scanning" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Scan className="w-4 h-4" />
              )}
              <span>Verify Pass</span>
            </button>
          </div>

          {/* Validation Result Box */}
          {scanState === "valid" && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 animate-in fade-in duration-150">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  PASS CONFIRMED — ACCESS GRANTED
                </div>
                <div className="text-xs text-slate-300">
                  Turnstile barrier unlatched (4.0s). Welcome to The Thrills Fun Park!
                </div>
              </div>
            </div>
          )}

          {scanState === "invalid" && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 animate-in fade-in duration-150">
              <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-rose-400 font-mono">
                  PASS INVALID OR EXPIRED
                </div>
                <div className="text-xs text-slate-300">
                  Please direct guest to Gate Support Counter A1.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Turnstile Check-in Logs */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-display">
            Recent Turnstile Activity Log
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {turnstileLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{log.time}</span>
                  <span className="text-white font-bold">{log.code}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[11px]">{log.gate}</span>
                  <span className="text-emerald-400 font-bold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
