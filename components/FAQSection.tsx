"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function FAQSection() {
  const { cmsData } = useCms();
  const [openId, setOpenId] = useState<string | null>(null);

  const section = cmsData.homeSections.find((s) => s.id === "faq");
  if (section && !section.enabled) return null;

  const active = [...cmsData.agencyFaqs]
    .filter((f) => f.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="relative border-y border-slate-200/60 bg-slate-50/70 py-14 sm:py-16 lg:py-20" id="faq">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="mb-2 font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {section?.title || "Frequently Asked Questions"}
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600">
            {section?.subtitle || "Everything you need to know about our design process, pricing, delivery, and guarantees."}
          </p>
        </motion.div>

        {/* FAQ items */}
        {active.length > 0 ? (
          <div className="grid gap-2.5 md:grid-cols-2">
            {active.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-white border-emerald-400 shadow-md ring-1 ring-emerald-400/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-bold text-slate-900 sm:text-[15px]">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${isOpen ? "bg-emerald-600" : "bg-slate-300"}`} />
                      {faq.question}
                    </span>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
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
                        <div className="border-t border-slate-100 bg-slate-50/50 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5">
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
        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white px-5 py-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">Still have a question?</p>
            <p className="mt-0.5 text-xs text-slate-500">Our team is available via WhatsApp or discovery call.</p>
          </div>
          <a href="/contact" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-600">
            <MessageCircle className="h-3.5 w-3.5" /> Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
