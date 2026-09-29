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

  const primaryColor = cmsData.general.primaryColor || "#00FF87";
  const secondaryColor = cmsData.general.secondaryColor || "#02180C";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950/65 p-4 backdrop-blur-sm animate-fadeIn"
      style={{ "--admin-primary": primaryColor, "--admin-secondary": secondaryColor } as React.CSSProperties}
    >
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="pointer-events-none absolute -left-24 top-[-9rem] h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-7rem] h-96 w-96 rounded-full bg-teal-300/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-white/[0.94] p-6 shadow-[0_30px_90px_rgba(1,18,10,0.35)] sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-50/90 to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="relative mb-7 pt-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
            {isSuccess ? (
              <ShieldCheck className="h-5 w-5 animate-bounce text-emerald-600" />
            ) : (
              <KeyRound className="h-5 w-5 text-emerald-600" />
            )}
          </div>
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-900">
            {isSuccess ? "You’re all set" : "Welcome back"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isSuccess
              ? "Opening your Qllix dashboard…"
              : "Enter your access code to manage the website."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="relative">
            <label htmlFor="admin-access-code" className="mb-2 block text-xs font-semibold text-slate-700">Access code</label>
            <input
              id="admin-access-code"
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={passcode}
              disabled={isSuccess}
              autoComplete="current-password"
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter your code"
              className={`w-full rounded-xl border bg-slate-50 px-4 py-3 pr-11 text-center font-mono text-sm tracking-[0.18em] text-slate-900 outline-none transition-all placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 ${
                error
                  ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
                  : isSuccess
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                  : "border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-[2.35rem] -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={showPassword ? "Hide access code" : "Show access code"}
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>That code didn&apos;t match. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSuccess || !passcode.trim()}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${
              isSuccess
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-[var(--admin-secondary)] text-white shadow-lg shadow-emerald-950/10 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
            }`}
          >
            {isSuccess ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Opening dashboard…</span>
              </>
            ) : (
              <>
                <span>Continue to dashboard</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        <div className="relative mt-5 border-t border-slate-100 pt-4 text-center">
          <span className="text-[11px] text-slate-400">Secure access for Qllix team members</span>
        </div>
      </div>
    </div>
  );
}
