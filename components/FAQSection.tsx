"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function FAQSection() {
  const { cmsData } = useCms();
  const [openId, setOpenId] = useState<string | null>(null);

  const section = cmsData.homeSections.find((s) => s.id === "faq");
  if (section && !section.enabled) return null;

  const active = [...cmsData.agencyFaqs]
    .filter((f) => f.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const categories = Array.from(new Set(active.map((f) => f.category)));

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 border-y border-slate-200/60" id="faq">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            {section?.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            {section?.subtitle || "Everything you need to know about our design process, pricing, delivery, and guarantees."}
          </p>
        </motion.div>

        {/* FAQ items */}
        {active.length > 0 ? (
          <div className="space-y-3.5">
            {active.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isOpen
                      ? "bg-white border-emerald-400 shadow-md ring-1 ring-emerald-400/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${isOpen ? "bg-emerald-600" : "bg-slate-300"}`} />
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-emerald-50 text-emerald-600 rotate-180" : "bg-slate-100 text-slate-500"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            No questions listed yet.
          </div>
        )}

        {/* Quick query banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Have a question not answered here?</p>
          <p className="text-xs text-slate-500 mt-1">We're available 7 days a week via WhatsApp or discovery call.</p>
        </div>
      </div>
    </section>
  );
}
