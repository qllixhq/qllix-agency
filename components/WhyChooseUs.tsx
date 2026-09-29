"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, RefreshCw, FileArchive, Target, Repeat, Users, Sparkles, CheckCircle2, HeartHandshake, Star, Clock } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const BENEFITS = [
  {
    icon: Zap,
    title: "Creative Expertise",
    desc: "Senior designers with 5+ years of experience in branding, motion, and digital design.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: RefreshCw,
    title: "Fast Delivery",
    desc: "Most projects delivered in 2–7 business days. Rush delivery available on request.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    icon: FileArchive,
    title: "Source Files Included",
    desc: "Business and Premium packages include full source files — AI, EPS, PSD, and more.",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
  },
  {
    icon: Target,
    title: "Strategic Design",
    desc: "We don't just make things look pretty — every design decision is made with strategy and purpose.",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-100",
  },
  {
    icon: Repeat,
    title: "Consistent Branding",
    desc: "All work is aligned with your brand identity for a consistent look across every platform.",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-100",
  },
  {
    icon: Users,
    title: "One Creative Partner",
    desc: "We handle design, video, branding, and marketing — so you don't need 5 different agencies.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
  },
];

const STATS = [
  {
    value: "200+",
    label: "Projects Delivered",
    sublabel: "Successfully Shipped",
    icon: CheckCircle2,
    badge: "100% Shipped",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    glowColor: "group-hover:border-emerald-500/40",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    sublabel: "Positive Client Feedback",
    icon: HeartHandshake,
    badge: "Top Rated",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    glowColor: "group-hover:border-cyan-500/40",
  },
  {
    value: "4.9/5",
    label: "Average Rating",
    sublabel: "150+ Verified Reviews",
    icon: Star,
    badge: "★★★★★",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    glowColor: "group-hover:border-amber-500/40",
  },
  {
    value: "48h",
    label: "Average Turnaround",
    sublabel: "Express Initial Delivery",
    icon: Clock,
    badge: "Express Speed",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    glowColor: "group-hover:border-emerald-500/40",
  },
];

export default function WhyChooseUs() {
  const { cmsData } = useCms();
  const section = cmsData.homeSections.find((s) => s.id === "why_us");
  if (section && !section.enabled) return null;

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 border-y border-slate-200/60" id="why-us">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00875A] text-xs font-bold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            {section?.title || "Why Leading Brands Choose Qllix"}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            {section?.subtitle || "We bridge the gap between creative excellence and commercial impact."}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative bg-white border border-slate-200/80 rounded-2xl p-7 hover:border-emerald-400 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} border flex items-center justify-center ${item.iconColor} mb-5 shadow-sm group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] bg-gradient-to-b from-white via-white to-slate-50/60 p-5 sm:p-7 lg:p-9 border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-80 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`group relative bg-white/80 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 ${stat.glowColor} hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* Top Bar: Icon + Micro Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className={`w-11 h-11 rounded-xl ${stat.iconBg} border flex items-center justify-center ${stat.iconColor} group-hover:scale-110 transition-transform`}>
                      <StatIcon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/60 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200/80 transition-colors">
                      {stat.badge}
                    </span>
                  </div>

                  {/* Stat Number */}
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 tracking-tight leading-none mb-2 font-sans group-hover:text-emerald-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
