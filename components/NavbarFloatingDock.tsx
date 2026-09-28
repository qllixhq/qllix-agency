"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  FolderKanban, 
  Layers, 
  Sparkles, 
  BadgeDollarSign, 
  Star, 
  ChevronUp, 
  ArrowUpRight,
  Palette,
  Layout,
  TrendingUp,
  X,
  Play,
  VolumeX,
  ArrowRight,
  Package,
  PhoneCall,
  MessageCircle,
  Headset,
  Users,
} from "lucide-react";

/* ═══ Active Button Running Stroke Animation Border ═══ */
function ActiveDockStroke({ rounded = "rounded-xl", isCta = false }: { rounded?: string; isCta?: boolean }) {
  return (
    <span className={`absolute inset-0 pointer-events-none ${rounded} overflow-hidden`}>
      {/* Base glow border */}
      <span className={`absolute inset-0 ${rounded} border ${isCta ? "border-white/50" : "border-[#00FF87]/35"}`} />
      {/* Animated continuous running stroke around perimeter */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dockActiveStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" />
            <stop offset="50%" stopColor="#60EFFF" />
            <stop offset="100%" stopColor="#00FF87" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={isCta ? 12 : 10}
          ry={isCta ? 12 : 10}
          fill="none"
          stroke="url(#dockActiveStrokeGrad)"
          strokeWidth="2.2"
          strokeDasharray="26 78"
          className="dock-running-stroke"
        />
      </svg>
    </span>
  );
}

interface NavbarFloatingDockProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function NavbarFloatingDock({ onOpenBooking }: NavbarFloatingDockProps) {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/services") {
      setActiveTab("services");
    } else if (pathname === "/projects") {
      setActiveTab("projects");
    } else if (pathname === "/team") {
      setActiveTab("team");
    } else if (pathname === "/contact") {
      setActiveTab("contact");
    } else if (pathname === "/pricing") {
      setActiveTab("pricing");
    } else if (pathname === "/") {
      const handleScroll = () => {
        const pricingEl = document.getElementById("pricing");
        if (pricingEl) {
          const rect = pricingEl.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 200) {
            setActiveTab("pricing");
            return;
          }
        }
        setActiveTab("");
      };
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setActiveTab("");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Full-Width Bottom Frosted Glass Blur Backdrop */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-30"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.08) 60%, transparent 100%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* 2. Main Floating Dock (Enlarged & Prominent) */}
      <div className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <nav 
          className="rounded-[22px] px-2.5 sm:px-6 py-2 sm:py-3 flex items-center gap-1 sm:gap-4.5 shadow-[0_20px_60px_rgba(0,0,0,0.95)] border border-white/[0.1] border-t-[#00FF87] border-t-[2px] bg-[#08080C]/95"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Projects Link */}
          <a
            href="/projects"
            className={`relative px-2 md:px-3.5 py-1 md:py-1.5 rounded-xl transition-all tracking-tight flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-0 ${
              activeTab === "projects"
                ? "text-[#00FF87] font-bold bg-[#00FF87]/12 shadow-[0_0_16px_rgba(0,255,135,0.25)]"
                : "text-white/85 hover:text-[#00FF87] hover:bg-white/[0.04]"
            }`}
          >
            {activeTab === "projects" && <ActiveDockStroke />}
            <FolderKanban className="w-4 h-4 md:hidden shrink-0" />
            <span className="relative z-10 text-[10px] md:text-[15.5px] font-semibold leading-none md:leading-normal">Projects</span>
          </a>

          {/* Services Direct Link */}
          <a
            href="/services"
            className={`relative px-2 md:px-3.5 py-1 md:py-1.5 rounded-xl transition-all tracking-tight flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-0 ${
              activeTab === "services"
                ? "text-[#00FF87] font-bold bg-[#00FF87]/12 shadow-[0_0_16px_rgba(0,255,135,0.25)]"
                : "text-white/85 hover:text-[#00FF87] hover:bg-white/[0.04]"
            }`}
          >
            {activeTab === "services" && <ActiveDockStroke />}
            <Layers className="w-4 h-4 md:hidden shrink-0" />
            <span className="relative z-10 text-[10px] md:text-[15.5px] font-semibold leading-none md:leading-normal">Services</span>
          </a>

          {/* MOBILE / TABLET: Center contact button */}
          <button
            type="button"
            onClick={() => setContactMenuOpen(!contactMenuOpen)}
            className={`lg:hidden relative w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_22px_rgba(0,255,135,0.5)] active:scale-95 transition-all cursor-pointer shrink-0 mx-1 ${
              contactMenuOpen
                ? "bg-slate-900 text-white border border-white/25"
                : "bg-gradient-to-tr from-[#00A859] via-[#00C853] to-[#00FF87] text-[#02180C] border-2 border-white"
            }`}
            aria-label="Toggle Direct Contact Menu"
            title="Direct Contact & Booking"
          >
            {/* Live Green Online Beacon Dot with Pulse (only when closed) */}
            {!contactMenuOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00FF87] border-2 border-[#08080C] shadow-[0_0_8px_#00FF87]">
                <span className="absolute inset-0 rounded-full bg-[#00FF87] animate-ping opacity-75" />
              </span>
            )}
            <div className="relative w-5 h-5 flex items-center justify-center">
              {contactMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <MessageCircle className="w-5 h-5 stroke-[2.4] fill-white/20" />
              )}
            </div>
          </button>

          {/* DESKTOP ONLY: Center "Let's Talk →" Button */}
          <a
            href="/contact"
            className="hidden md:flex relative dock-cta-animated active:scale-95 transition-all whitespace-nowrap"
            title="Contact & Booking"
          >
            {activeTab === "contact" && <ActiveDockStroke isCta={true} rounded="rounded-[12px]" />}
            <span className="relative z-10 font-extrabold tracking-tight text-[#02180C] text-[15px] whitespace-nowrap">Let&apos;s Talk</span>
            <ArrowRight className="relative z-10 w-4 h-4 stroke-[3] text-[#02180C] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>

          {/* Pricing Link */}
          <a
            href="/pricing"
            onClick={(e) => {
              const el = document.getElementById("pricing");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
                setActiveTab("pricing");
              }
            }}
            className={`relative px-2 md:px-3.5 py-1 md:py-1.5 rounded-xl transition-all tracking-tight flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-0 ${
              activeTab === "pricing"
                ? "text-[#00FF87] font-bold bg-[#00FF87]/12 shadow-[0_0_16px_rgba(0,255,135,0.25)]"
                : "text-white/85 hover:text-[#00FF87] hover:bg-white/[0.04]"
            }`}
          >
            {activeTab === "pricing" && <ActiveDockStroke />}
            <BadgeDollarSign className="w-4 h-4 md:hidden shrink-0" />
            <span className="relative z-10 text-[10px] md:text-[15.5px] font-semibold leading-none md:leading-normal">Pricing</span>
          </a>

          {/* Team Link */}
          <a
            href="/team"
            className={`relative px-2 md:px-3.5 py-1 md:py-1.5 rounded-xl transition-all tracking-tight flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-0 ${
              activeTab === "team"
                ? "text-[#00FF87] font-bold bg-[#00FF87]/12 shadow-[0_0_16px_rgba(0,255,135,0.25)]"
                : "text-white/85 hover:text-[#00FF87] hover:bg-white/[0.04]"
            }`}
          >
            {activeTab === "team" && <ActiveDockStroke />}
            <Users className="w-4 h-4 md:hidden shrink-0" />
            <span className="relative z-10 text-[10px] md:text-[15.5px] font-semibold leading-none md:leading-normal">Team</span>
          </a>
        </nav>
      </div>

      {/* 6. Interactive Smart Speed-Dial CTA Icons */}
      {contactMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px] transition-all"
          onClick={() => setContactMenuOpen(false)}
        />
      )}

      {/* MOBILE POPUP: Pure Borderless Smart CTA Icons */}
      {contactMenuOpen && (
        <div className="md:hidden fixed bottom-[78px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 px-3 w-max">
          {/* 1. Book a Call (TidyCal) */}
          <a
            href="https://tidycal.com/qllix/next-step-together"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00A859] via-[#00C853] to-[#00FF87] text-white shadow-[0_8px_25px_rgba(0,200,83,0.5)] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            title="Book a Discovery Call"
            aria-label="Book a Call"
          >
            <PhoneCall className="w-5 h-5 text-white stroke-[2.4]" />
          </a>

          {/* 2. WhatsApp Direct Chat */}
          <a
            href="https://wa.me/8801911994532?text=Hello%20Qllix,%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.5)] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Chat"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.301-.776.979-.951 1.179-.176.2-.351.226-.652.075-.3-.15-1.267-.467-2.414-1.49-1.077-.96-1.804-2.148-2.015-2.51-.21-.362-.022-.557.128-.707.135-.136.301-.351.451-.527.151-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.514-.176-.009-.376-.009-.577-.009s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.513 0 1.482 1.079 2.914 1.23 3.114.15.201 2.122 3.242 5.142 4.547.718.311 1.279.497 1.716.636.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.276-.201-.577-.352z"/>
              <path d="M12.004 0C5.385 0 .008 5.378.008 12c0 2.115.55 4.177 1.597 5.992L0 24l6.177-1.62A11.968 11.968 0 0012.004 24C18.621 24 24 18.622 24 12s-5.379-12-11.996-12zm0 21.943a9.917 9.917 0 01-5.06-1.385l-.363-.215-3.665.961.978-3.574-.236-.376a9.923 9.923 0 01-1.523-5.354c0-5.485 4.463-9.948 9.869-9.948 5.405 0 9.868 4.463 9.868 9.948 0 5.485-4.463 9.943-9.868 9.943z"/>
            </svg>
          </a>

          {/* 3. Facebook Messenger Direct Chat */}
          <a
            href="https://m.me/Qllix"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0064E0] via-[#0084FF] to-[#A033FF] text-white shadow-[0_8px_25px_rgba(0,132,255,0.5)] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            title="Chat on Messenger"
            aria-label="Facebook Messenger"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.077.299 2.222.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z"/>
            </svg>
          </a>
        </div>
      )}

      {/* DESKTOP POPUP: Pure Borderless Smart CTA Icons (Vertical Stack, No Text, No White Borders) */}
      {contactMenuOpen && (
        <div className="hidden md:flex fixed bottom-[94px] right-7 z-50 flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* 1. Schedule / Book a Call (TidyCal) */}
          <a
            href="https://tidycal.com/qllix/next-step-together"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00A859] via-[#00C853] to-[#00FF87] text-white shadow-[0_8px_30px_rgba(0,200,83,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            aria-label="Schedule a Call"
            title="Book a Discovery Call"
          >
            <PhoneCall className="w-6 h-6 text-white stroke-[2.3] group-hover:rotate-12 transition-transform" />
          </a>

          {/* 2. WhatsApp Direct Chat */}
          <a
            href="https://wa.me/8801911994532?text=Hello%20Qllix,%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            aria-label="WhatsApp Chat"
            title="Chat on WhatsApp (+8801911994532)"
          >
            <svg className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.301-.776.979-.951 1.179-.176.2-.351.226-.652.075-.3-.15-1.267-.467-2.414-1.49-1.077-.96-1.804-2.148-2.015-2.51-.21-.362-.022-.557.128-.707.135-.136.301-.351.451-.527.151-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.514-.176-.009-.376-.009-.577-.009s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.513 0 1.482 1.079 2.914 1.23 3.114.15.201 2.122 3.242 5.142 4.547.718.311 1.279.497 1.716.636.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.276-.201-.577-.352z"/>
              <path d="M12.004 0C5.385 0 .008 5.378.008 12c0 2.115.55 4.177 1.597 5.992L0 24l6.177-1.62A11.968 11.968 0 0012.004 24C18.621 24 24 18.622 24 12s-5.379-12-11.996-12zm0 21.943a9.917 9.917 0 01-5.06-1.385l-.363-.215-3.665.961.978-3.574-.236-.376a9.923 9.923 0 01-1.523-5.354c0-5.485 4.463-9.948 9.869-9.948 5.405 0 9.868 4.463 9.868 9.948 0 5.485-4.463 9.943-9.868 9.943z"/>
            </svg>
          </a>

          {/* 3. Facebook Messenger Direct Chat */}
          <a
            href="https://m.me/Qllix"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContactMenuOpen(false)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0064E0] via-[#0084FF] to-[#A033FF] text-white shadow-[0_8px_30px_rgba(0,132,255,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            aria-label="Facebook Messenger"
            title="Chat on Messenger"
          >
            <svg className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.077.299 2.222.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z"/>
            </svg>
          </a>

        </div>
      )}

      {/* Main Floating Action Button (DESKTOP ONLY - On mobile it is located in the center of the dock) */}
      <button
        onClick={() => setContactMenuOpen(!contactMenuOpen)}
        className={`hidden md:flex fixed bottom-5 sm:bottom-7 right-5 sm:right-7 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full items-center justify-center shadow-[0_10px_35px_rgba(0,200,83,0.45)] hover:scale-108 active:scale-95 transition-all cursor-pointer group ${
          contactMenuOpen 
            ? "bg-slate-900 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-tr from-[#00A859] via-[#00C853] to-[#00FF87] text-[#02180C]"
        }`}
        aria-label="Toggle Direct Contact Menu"
        title="Contact Qllix"
      >
        {/* Live Green Online Beacon Dot with Pulse (only when closed) */}
        {!contactMenuOpen && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#00FF87] border-2 border-white shadow-[0_0_10px_#00FF87]">
            <span className="absolute inset-0 rounded-full bg-[#00FF87] animate-ping opacity-75" />
          </span>
        )}
        
        {/* Dynamic Icon */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          {contactMenuOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-6 h-6 stroke-[2.4] fill-white/20" />
          )}
        </div>
      </button>
    </>
  );
}
