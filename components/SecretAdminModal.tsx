"use client";

import React, { useState, useEffect, useRef } from "react";
import { KeyRound, ArrowRight, X, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { ADMIN_AUTH_KEY } from "@/lib/cmsStore";

// Exportable helper to trigger the secret gateway from anywhere (e.g. triple clicks)
let secretClickCount = 0;
let secretClickTimer: NodeJS.Timeout | null = null;

export function triggerSecretAdminModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-secret-admin"));
  }
}

export function handleSecretTripleClick() {
  secretClickCount++;
  if (secretClickCount >= 3) {
    triggerSecretAdminModal();
    secretClickCount = 0;
    if (secretClickTimer) clearTimeout(secretClickTimer);
    return;
  }
  if (secretClickTimer) clearTimeout(secretClickTimer);
  secretClickTimer = setTimeout(() => {
    secretClickCount = 0;
  }, 1200);
}

interface SecretAdminModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SecretAdminModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: SecretAdminModalProps) {
  const { cmsData } = useCms();
  const [internalOpen, setInternalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine if open from props or internal event
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  useEffect(() => {
    const handleOpenEvent = () => {
      setInternalOpen(true);
    };
    window.addEventListener("open-secret-admin", handleOpenEvent);
    return () => window.removeEventListener("open-secret-admin", handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setPasscode("");
      setError(false);
      setErrorMessage("");
      setIsSuccess(false);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    const correctCode = cmsData.general.adminPasscode || "admin2026";

    if (passcode.trim() === correctCode) {
      setIsSuccess(true);
      setError(false);

      // Store authentication tokens
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
      } catch (err) {
        console.error(err);
      }

      // Redirect after brief visual feedback
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } else {
      setError(true);
      setErrorMessage("Access Denied: Invalid Security Code");
      setPasscode("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-sm bg-[#020F07] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,255,135,0.2)] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#00FF87]/15 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(0,255,135,0.2)]">
            {isSuccess ? (
              <ShieldCheck className="w-6 h-6 text-[#00FF87] animate-bounce" />
            ) : (
              <KeyRound className="w-6 h-6 text-[#00FF87]" />
            )}
          </div>
          <h3 className="text-base font-bold text-white font-serif tracking-wide">
            {isSuccess ? "Access Granted" : "Master Security Gate"}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {isSuccess
              ? "Authenticating session & launching dashboard..."
              : "Enter authorized master code to access admin console"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={passcode}
              disabled={isSuccess}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter Access Code"
              className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white text-sm placeholder-slate-600 font-mono tracking-widest text-center focus:outline-none transition-all ${
                error
                  ? "border-rose-500 ring-1 ring-rose-500"
                  : isSuccess
                  ? "border-[#00FF87] ring-1 ring-[#00FF87] text-[#00FF87]"
                  : "border-white/15 focus:border-[#00FF87] focus:ring-1 focus:ring-[#00FF87]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSuccess || !passcode.trim()}
            className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSuccess
                ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(0,255,135,0.4)]"
                : "bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] shadow-[0_4px_20px_rgba(0,255,135,0.3)] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {isSuccess ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <span>Unlock Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/5 text-center">
          <span className="text-[10px] text-slate-600 font-mono">
            Authorized Personnel Only
          </span>
        </div>
      </div>
    </div>
  );
}
