"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export default function DeviceShowcaseMarquee() {
  const [activeDeviceCategory, setActiveDeviceCategory] = useState<"all" | "saas" | "mobile" | "brand">("all");

  const tickerItems = [
    "Framer Motion",
    "Brand Identity",
    "SaaS Dashboards",
    "Vector Logos",
    "Webflow Flagships",
    "Investor Pitch Decks",
    "Mobile App UI",
    "Figma Design Systems",
    "Social Ad Kits",
    "Next.js 14 Architecture",
    "Conversion Rate Optimization (CRO)",
    "Interactive Design Systems"
  ];

  const showcaseDevices = [
    {
      id: "1",
      title: "Triply Travel OS",
      category: "saas",
      type: "iPad Pro",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tag: "UI/UX & Analytics"
    },
    {
      id: "2",
      title: "Plate Mobile Food App",
      category: "mobile",
      type: "iPhone 15 Pro",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
      tag: "iOS & Android UI"
    },
    {
      id: "3",
      title: "NextSpace Cloud AI",
      category: "saas",
      type: "MacBook Pro",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tag: "Next.js Web Platform"
    },
    {
      id: "4",
      title: "MonksWizard Fintech",
      category: "brand",
      type: "iPad Pro",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      tag: "Brand & Digital Platform"
    },
    {
      id: "5",
      title: "ArtStation Pro Mobile",
      category: "mobile",
      type: "iPhone 15 Pro",
      image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80",
      tag: "Mobile Experience"
    },
    {
      id: "6",
      title: "Innovex AI Platform",
      category: "saas",
      type: "iPad Pro",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tag: "SaaS Dashboard System"
    }
  ];

  const filteredDevices = activeDeviceCategory === "all" 
    ? showcaseDevices 
    : showcaseDevices.filter(d => d.category === activeDeviceCategory);

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#1C0E38] via-[#150A2B] to-[#0A0A0E] overflow-hidden">
      
      {/* Top Ticker Ribbon (Left to Right) */}
      <div className="py-3 border-y border-purple-500/20 bg-purple-950/40 backdrop-blur-md overflow-hidden whitespace-nowrap mb-12">
        <div className="inline-flex gap-8 animate-marquee-fast">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-6">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#E9D5FF] font-sans">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#30FF97]" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flawless &amp; Captivating Design for <em className="text-[#30FF97] serif-italic font-normal">Every Screen &amp; Device</em>
        </h2>
      </div>

      {/* Horizontal Device Showcase Track */}
      <div className="relative w-full overflow-x-auto pb-8 pt-4 px-4 sm:px-8 no-scrollbar">
        <div className="flex gap-6 min-w-max">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className="w-[300px] sm:w-[360px] rounded-3xl bg-[#111118] border border-white/10 p-4 relative overflow-hidden group shadow-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black mb-4">
                <img
                  src={device.image}
                  alt={device.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                  {device.type}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-purple-900/80 backdrop-blur-md text-[10px] font-mono text-[#E9D5FF] border border-purple-500/30">
                    {device.tag}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#A87FFF] transition-colors">
                    {device.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">High-impact interface &amp; motion</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#6344F5] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker Ribbon (Right to Left) */}
      <div className="py-3 border-y border-purple-500/20 bg-purple-950/40 backdrop-blur-md overflow-hidden whitespace-nowrap mt-8">
        <div className="inline-flex gap-8 animate-marquee-fast-reverse">
          {[...tickerItems, ...tickerItems, ...tickerItems].reverse().map((item, i) => (
            <div key={i} className="inline-flex items-center gap-6">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#E9D5FF] font-sans">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A87FFF]" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
