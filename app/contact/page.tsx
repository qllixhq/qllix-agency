"use client";

import React, { useState } from "react";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import Footer from "@/components/Footer";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Globe, 
  Plus, 
  Minus,
  Star,
  Volume2,
  VolumeX,
  Sparkles
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function ContactPage() {
  const { cmsData, addInquiry } = useCms();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappCountryCode: "+1",
    whatsappNumber: "",
    service: "Ex. Web Design",
    budget: "Ex. ৳20K - ৳50K",
    details: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      whatsappCountryCode: formData.whatsappCountryCode,
      whatsappNumber: formData.whatsappNumber,
      service: formData.service,
      budget: formData.budget,
      details: formData.details
    });
    setSubmitted(true);
  };


  const testimonials = [
    {
      name: "Sophia Gouveia",
      role: "Design Director @ Esdiac",
      quote: "Working with Qllix on our web flagship and mobile product was seamless. They are patient, deeply responsive to strategic feedback, and delivered uncompromising quality."
    },
    {
      name: "Neil Saidi",
      role: "Founder @ LeKlub",
      quote: "Remarkable execution. Their team understood our high-concept vision instantly and transformed it into a breathtaking, high-performing digital reality."
    },
    {
      name: "Fahim Aziz",
      role: "Founder @ Backpack (YC), Affine",
      quote: "Qllix designed UI/UX systems that directly accelerated our conversion metrics. Their instinct for pairing aesthetic luxury with commercial ROI is rare."
    },
    {
      name: "Kunle Adetayo",
      role: "CEO & Founder @ Plentypay",
      quote: "Partnering with Qllix shortened our time-to-market by weeks. Their engineering discipline and adherence to tight sprint milestones is second to none."
    }
  ];

  const faqs = [
    {
      q: "How long does a typical project sprint take?",
      a: "Every engagement is sprint-based. Standard brand identity sprints take 7–10 days, while custom Next.js web flagships take 2–3 weeks. We maintain synchronous momentum with zero bureaucratic delays."
    },
    {
      q: "What makes Qllix fundamentally different from traditional agencies?",
      a: "No junior handoffs, no bloated overhead, and no months of endless discovery decks. You collaborate directly with senior design and engineering partners shipping in rapid 48-hour feedback loops."
    },
    {
      q: "What are your standard project budgets?",
      a: "Fixed sprint scopes range from ৳15,000 to ৳85,000, while ongoing performance growth retainers start at ৳18,000/month. We guarantee 100% transparent pricing with zero surprise invoices."
    },
    {
      q: "Do you work with early-stage startups?",
      a: "Yes. Many of our most successful partnerships started with pre-seed or Series A founders needing category-defining visuals to close enterprise rounds and customers."
    },
    {
      q: "What tools and technologies power your builds?",
      a: "We architect in Figma for design systems, Adobe Suite for vector brand collateral, Next.js 14, TypeScript, and Tailwind CSS for web apps, and Meta/Google CAPI for attribution."
    },
    {
      q: "Do you build full-stack web applications and SaaS platforms?",
      a: "Absolutely. In addition to high-converting marketing flagships, our senior engineers construct interactive SaaS dashboards, billing portals, and custom web applications."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#07050E] text-slate-900 overflow-x-hidden selection:bg-[#00FF87]/30 selection:text-emerald-950">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER (Unified Cyber Vortex Theme from Live CMS, No Subtitle) */}
      {/* ========================================================================= */}
      <SubpageHeroBanner 
        pageKey="contact" 
        title={<span>Start Your Brand <em className="text-[#00FF87] not-italic font-serif">Transformation</em></span>}
      />

      {/* ═══ WHITE SHEET CONTENT WRAPPER (Curved Corner System) ═══ */}
      <div className="relative z-10 bg-[#FAF9F5] -mt-6 sm:-mt-8 pt-8 sm:pt-12 pb-20 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5 text-slate-900">

      {/* ========================================================================= */}
      {/* 2. MAIN WHITE CARD CONTAINER (Design Monks 1:1 Match) */}
      {/* ========================================================================= */}
      <section id="contact-form" className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[32px] sm:rounded-[44px] bg-white text-slate-900 p-7 sm:p-12 lg:p-16 shadow-xl border border-black/5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ═══ LEFT COLUMN ═══ */}
            <div className="lg:col-span-5 space-y-7">
              <div>
                {/* Contact Us Pill */}
                <div className="inline-block px-4 py-1 rounded-full border border-emerald-500/40 bg-emerald-50/70 text-[#059669] text-xs font-bold tracking-wide mb-4">
                  Contact Us
                </div>

                {/* Big Heading */}
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Tell Us Your <br />
                  Amazing <br />
                  <span className="font-serif italic font-normal text-slate-900">Project Here</span>
                </h2>
              </div>

              {/* 3 Check Bullet Points */}
              <div className="space-y-3.5 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF87]/25 text-[#059669] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  </div>
                  <span>Expect a response from us within 24 hours</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF87]/25 text-[#059669] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  </div>
                  <span>We&apos;re happy to sign an NDA upon request.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF87]/25 text-[#059669] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  </div>
                  <span>Get access to a team of dedicated product specialists.</span>
                </div>
              </div>

              {/* Interactive Video Presentation Card (Screenshot 2 1:1 Match) */}
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#121226] via-[#10192A] to-[#0A1A16] p-5 sm:p-6 text-white relative shadow-2xl border border-slate-700/60 mt-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Left Badges */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-slate-200">
                      The design looks okay <br />
                      <span className="text-slate-400">Users aren&apos;t converting</span>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-slate-200">
                      Users come in <br />
                      <span className="text-slate-400">They don&apos;t stick around</span>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-slate-200">
                      Tried freelancers/agencies
                    </div>

                    <p className="text-[11px] text-slate-400 italic pt-1">
                      Or maybe you&apos;ve already tried
                    </p>
                  </div>

                  {/* Right Founder Video Frame */}
                  <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-inner border border-white/20 group cursor-pointer">
                    <img
                      src="/images/contact_founder.jpg"
                      alt="Qllix Agency Partner"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Mute/Audio Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md"
                      aria-label="Toggle Audio"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-slate-200" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#00FF87]" />
                      )}
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* ═══ RIGHT COLUMN (FORM) ═══ */}
            <div className="lg:col-span-7 pt-2">
              {submitted ? (
                <div className="p-8 sm:p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-[#059669]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our senior partners are reviewing your project brief and will reach out to <strong className="text-[#059669]">{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-[#00FF87] hover:text-[#02180C] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-200 focus:border-[#00DF81] pb-2 text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none transition-colors"
                    />
                  </div>

                  {/* Field 2 & 3: Your Email & Whatsapp Number Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">
                        Your Email*
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourmail@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-slate-200 focus:border-[#00DF81] pb-2 text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">
                        Whatsapp Number
                      </label>
                      <div className="flex items-center border-b border-slate-200 focus-within:border-[#00DF81] pb-2 transition-colors">
                        <div className="flex items-center gap-1 text-slate-500 text-sm font-medium pr-2 border-r border-slate-200 mr-2">
                          <Globe className="w-4 h-4 text-slate-500" />
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          placeholder="123 456 7890"
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 4: Service* */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">
                      Service*
                    </label>
                    <div className="relative border-b border-slate-200 focus-within:border-[#00DF81] pb-2 transition-colors">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-transparent text-slate-900 font-medium text-sm sm:text-base outline-none appearance-none pr-8 cursor-pointer"
                      >
                        <option value="Ex. Web Design">Ex. Web Design</option>
                        <option value="Brand & Graphic Design">Brand &amp; Visual Identity Design</option>
                        <option value="Next.js & SaaS Platform Development">Next.js 14 &amp; SaaS Platform Development</option>
                        <option value="Digital Performance Marketing">Digital Marketing &amp; CRO Funnels</option>
                        <option value="All-in-One Full Squad Growth">All-in-One Full Squad Growth</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1 pointer-events-none" />
                    </div>
                  </div>

                  {/* Field 5: Project Budget */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">
                      Project Budget
                    </label>
                    <div className="relative border-b border-slate-200 focus-within:border-[#00DF81] pb-2 transition-colors">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent text-slate-900 font-medium text-sm sm:text-base outline-none appearance-none pr-8 cursor-pointer"
                      >
                        <option value="Ex. ৳20K - ৳50K">Ex. ৳20K - ৳50K</option>
                        <option value="৳5,000 - ৳15,000">৳5,000 - ৳15,000 (MVP Sprint)</option>
                        <option value="৳15,000 - ৳35,000">৳15,000 - ৳35,000 (Flagship Build)</option>
                        <option value="৳35,000 - ৳75,000">৳35,000 - ৳75,000 (Scale-Up)</option>
                        <option value="৳75,000+">৳75,000+ (Enterprise)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1 pointer-events-none" />
                    </div>
                  </div>

                  {/* Field 6: Project Details* */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">
                      Project Details*
                    </label>
                    <textarea
                      rows={3}
                      placeholder="I want to redesign my website.."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-200 focus:border-[#00DF81] pb-2 text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button (Exact Purple/Emerald Button with Arrow) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] hover:from-[#24FFA0] hover:to-[#00F58D] text-[#02180C] font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 group active:scale-95 cursor-pointer"
                    >
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>
      </section>



      {/* ========================================================================= */}
      {/* 4. SUCCESS STORIES */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00A854] font-bold">Client Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1 font-serif">
            Proven Partnerships That <span className="text-[#00A854] font-serif italic">Inspire Confidence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-black/5 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-normal italic">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-950">{test.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{test.role}</p>
                </div>
                <a
                  href="#contact-form"
                  className="text-xs font-bold text-[#00A854] hover:underline"
                >
                  Book Call →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FAQ ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00A854] font-bold">Clear Answers</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1 font-serif">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-black/5 overflow-hidden transition-colors shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
              >
                <span className="text-base font-bold text-slate-950">{faq.q}</span>
                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-slate-600 shrink-0">
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-black/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* Footer & Floating Navigation Dock */}
      <Footer onOpenBooking={() => {}} />
      <NavbarFloatingDock onOpenBooking={() => {}} />

    </main>
  );
}
