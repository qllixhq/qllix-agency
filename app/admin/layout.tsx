"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { ADMIN_AUTH_KEY } from "@/lib/cmsStore";
import { AdminThemeProvider, useAdminTheme } from "@/context/AdminThemeContext";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { cmsData, isLoaded } = useCms();
  const { isDark } = useAdminTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const auth = sessionStorage.getItem(ADMIN_AUTH_KEY) || localStorage.getItem(ADMIN_AUTH_KEY);
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Auth check failed", e);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctCode = cmsData.general.adminPasscode || "admin2026";
    if (passcode.trim() === correctCode) {
      setIsAuthenticated(true);
      setError("");
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
    } else {
      setError("Incorrect security passcode");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  if (checkingAuth || !isLoaded) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#020B05] text-white" : "bg-slate-50 text-slate-900"}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#00FF87] border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-slate-400">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  // ═══ AUTHENTICATION GATE ═══
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-[#010804] bg-gradient-to-b from-[#010804] via-[#02140A] to-[#010804] text-white" : "bg-slate-50 text-slate-900"} flex items-center justify-center px-4 relative overflow-hidden select-none`}>
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF87]/8 blur-[200px] rounded-full pointer-events-none" />

        <div className={`relative z-10 w-full max-w-md ${isDark ? "bg-[#020F07]/90 border-emerald-500/25 text-white" : "bg-white border-slate-200 text-slate-900 shadow-2xl"} border rounded-3xl p-8 sm:p-10 backdrop-blur-xl`}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,255,135,0.25)]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight font-serif">
              Restricted Terminal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Enter master passcode to unlock administrative workspace
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                Security Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter security code"
                  className={`w-full px-4 py-3.5 rounded-xl ${isDark ? "bg-black/60 border-white/15 text-white" : "bg-slate-50 border-slate-300 text-slate-900"} border placeholder-slate-500 text-sm focus:outline-none focus:border-[#00FF87] focus:ring-1 focus:ring-[#00FF87] transition-all font-mono tracking-wider`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <span>⚠️</span> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-sm tracking-wide transition-all shadow-[0_4px_25px_rgba(0,255,135,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Authenticate &amp; Enter</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="pt-2 text-center">
              <a
                href="/"
                className="text-[11px] text-slate-500 hover:text-emerald-400 transition-colors font-mono"
              >
                ← Return to Website
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex selection:bg-[#00FF87]/30 selection:text-[#00FF87] transition-colors duration-300 ${
      isDark
        ? "admin-dark bg-[#010804] text-slate-100"
        : "admin-light bg-[#F8FAFC] text-slate-900"
    }`}>
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminThemeProvider>
  );
}
