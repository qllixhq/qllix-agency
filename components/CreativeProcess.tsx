"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Map, Wand2, Package, ArrowRight, Sparkles } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discuss",
    desc: "We start with a detailed conversation about your brand, goals, and vision. No templates — just a genuine understanding of what you need.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
  },
  {
    number: "02",
    icon: Map,
    title: "Plan",
    desc: "We craft a tailored creative strategy and project roadmap. You approve the direction before a single pixel is designed.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    number: "03",
    icon: Wand2,
    title: "Create",
    desc: "Our designers get to work, delivering premium designs with full revisions. Your feedback shapes every iteration.",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
  },
  {
    number: "04",
    icon: Package,
    title: "Deliver",
    desc: "Final files delivered in all required formats — print-ready, web-optimized, and source files included. Done right, on time.",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-100",
  },
];

export default function CreativeProcess() {
  const { cmsData } = useCms();
  const section = cmsData.homeSections.find((s) => s.id === "process");
  if (section && !section.enabled) return null;

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 border-y border-slate-200/60 overflow-hidden" id="process">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            {section?.title || "How We Bring Ideas to Life"}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            {section?.subtitle || "From initial concept to final export, our 4-step workflow ensures clarity, speed, and precision."}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-400 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div>
                  {/* Step number badge & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-emerald-600">
                      {step.number}
                    </span>
                    <div className={`w-11 h-11 rounded-xl ${step.iconBg} border flex items-center justify-center ${step.iconColor} shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow indicator between steps (except last) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
