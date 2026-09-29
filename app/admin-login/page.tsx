"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || "Unable to sign in.");
        return;
      }

      localStorage.setItem("qllix_admin_auth_session", "true");
      const destination = new URLSearchParams(window.location.search).get("next");
      window.location.assign(destination?.startsWith("/admin") ? destination : "/admin");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_42%)]" />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md rounded-[28px] border border-white/15 bg-[#0b0b0b] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.75)] sm:p-10">
        <div className="mb-9 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-black">
            <img src="/images/qllix-admin-logo.png" alt="Qllix" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.04em]">Qllix Admin</h1>
          <p className="mt-2 text-sm text-zinc-400">Enter your access code to continue.</p>
        </div>

        <label htmlFor="admin-passcode" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">Access code</label>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            id="admin-passcode"
            type={showPasscode ? "text" : "password"}
            autoComplete="current-password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/70 focus:ring-1 focus:ring-white/20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPasscode((current) => !current)}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
            aria-label={showPasscode ? "Hide access code" : "Show access code"}
          >
            {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="mt-3 text-xs font-medium text-white">{error}</p>}

        <button disabled={isSubmitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-60">
          <span>{isSubmitting ? "Signing in..." : "Continue"}</span>
          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      </form>
    </main>
  );
}