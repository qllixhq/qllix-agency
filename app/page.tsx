"use client";

import React, { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import ServicePricingSection from "@/components/ServicePricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import CreativeProcess from "@/components/CreativeProcess";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import BookingModal from "@/components/BookingModal";
import CTASection from "@/components/CTASection";
import ServiceDetailModal from "@/components/ServiceDetailModal";

export default function HomePage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderServiceId, setOrderServiceId] = useState<string | undefined>();
  const [orderPackageId, setOrderPackageId] = useState<string | undefined>();

  // Service Detail Modal
  const [detailServiceId, setDetailServiceId] = useState<string | null>(null);
  const [selectedPricingServiceId, setSelectedPricingServiceId] = useState<string | undefined>();

  // Legacy booking modal (used by hero CTA)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [estimatedBudget, setEstimatedBudget] = useState<number | undefined>();

  const handleOpenOrder = (serviceId?: string, packageId?: string) => {
    setOrderServiceId(serviceId);
    setOrderPackageId(packageId);
    setOrderModalOpen(true);
  };

  const handleOpenBooking = (serviceId?: string, budget?: number) => {
    setSelectedService(serviceId);
    setEstimatedBudget(budget);
    setBookingModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#07050E] text-slate-900 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-800">

      {/* Ambient Clean Background */}
      <AnimatedBackground />

      {/* 01. Hero Section — Signature Showcase */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* ═══ WHITE SHEET CONTENT WRAPPER (Curved Corner System Matching Team Page) ═══ */}
      <div className="relative z-10 bg-white -mt-6 sm:-mt-10 pt-0 sm:pt-2 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5">
        {/* 02. Services Overview */}
        <ServicesOverview
          onOrderClick={(serviceId) => handleOpenOrder(serviceId)}
          onViewPackages={(serviceId) => {
            setSelectedPricingServiceId(serviceId);
            const el = document.getElementById("pricing");
            if (el) { el.scrollIntoView({ behavior: "smooth" }); }
          }}
          onServiceClick={(serviceId) => {
            setDetailServiceId(serviceId);
            setSelectedPricingServiceId(serviceId);
          }}
        />

        {/* 03. Why Choose Us */}
        <WhyChooseUs />

        {/* 04. Service Packages / Pricing */}
        <ServicePricingSection
          selectedServiceId={selectedPricingServiceId}
          onOrderClick={(serviceId, packageId) => handleOpenOrder(serviceId, packageId)}
        />

        {/* 05. Portfolio / Selected Works */}
        <PortfolioSection onOrderClick={() => handleOpenOrder()} />

        {/* 07. Creative Process */}
        <CreativeProcess />

        {/* 08. Testimonials */}
        <Testimonials />

        {/* 09. FAQ */}
        <FAQSection />

        {/* 10. Final CTA */}
        <CTASection onOpenBooking={() => handleOpenOrder()} />
      </div>

      {/* 11. Footer */}
      <Footer onOpenBooking={() => handleOpenOrder()} />

      {/* Floating Nav */}
      <NavbarFloatingDock onOpenBooking={handleOpenBooking} />

      {/* Service Detail Modal (Deep Discovery & Deliverables) */}
      <ServiceDetailModal
        serviceId={detailServiceId}
        onClose={() => setDetailServiceId(null)}
        onOrderPackage={(serviceId, packageId) => {
          setDetailServiceId(null);
          handleOpenOrder(serviceId, packageId);
        }}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => { setOrderModalOpen(false); setOrderServiceId(undefined); setOrderPackageId(undefined); }}
        initialServiceId={orderServiceId}
        initialPackageId={orderPackageId}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => { setBookingModalOpen(false); setSelectedService(undefined); setEstimatedBudget(undefined); }}
        initialService={selectedService}
        initialBudget={estimatedBudget}
      />
    </main>
  );
}
