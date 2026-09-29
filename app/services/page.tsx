"use client";

import React, { useState, useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import Footer from "@/components/Footer";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";
import ServicesOverview from "@/components/ServicesOverview";
import ServicePricingSection from "@/components/ServicePricingSection";
import OrderModal from "@/components/OrderModal";
import ServiceDetailModal from "@/components/ServiceDetailModal";

export default function ServicesPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderServiceId, setOrderServiceId] = useState<string | undefined>();
  const [orderPackageId, setOrderPackageId] = useState<string | undefined>();
  const [detailServiceId, setDetailServiceId] = useState<string | null>(null);
  const [selectedPricingServiceId, setSelectedPricingServiceId] = useState<string | undefined>();

  // Check URL parameters or hash for direct deep-linking without needing useSearchParams
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const sParam = params.get("service");
        if (sParam) {
          setDetailServiceId(sParam);
          setSelectedPricingServiceId(sParam);
        } else if (window.location.hash) {
          const hashId = window.location.hash.replace("#", "");
          if (hashId && hashId !== "pricing" && hashId !== "services") {
            setDetailServiceId(hashId);
            setSelectedPricingServiceId(hashId);
          }
        }
      }
    } catch {}
  }, []);

  const handleOpenOrder = (serviceId?: string, packageId?: string) => {
    setOrderServiceId(serviceId);
    setOrderPackageId(packageId);
    setOrderModalOpen(true);
  };

  const handleServiceSelect = (sId: string) => {
    setDetailServiceId(sId);
    setSelectedPricingServiceId(sId);
  };

  return (
    <main className="relative min-h-screen bg-[#07050E] text-slate-900 overflow-x-hidden">
      <AnimatedBackground />

      {/* Signature Top Banner with Centered Logo & Breadcrumbs (No Button, No Subtitle) */}
      <SubpageHeroBanner 
        pageKey="services" 
        title={<span>Specialized <em className="text-[#00FF87] not-italic font-serif">Creative Services</em></span>}
      />

      {/* ═══ WHITE SHEET CONTENT WRAPPER ═══ */}
      <div className="relative z-10 bg-white -mt-8 sm:-mt-10 pt-4 sm:pt-6 pb-28 sm:pb-36 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5">
        <ServicesOverview
          onOrderClick={(sId) => handleOpenOrder(sId)}
          onViewPackages={(sId) => {
            setSelectedPricingServiceId(sId);
            const el = document.getElementById("pricing");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onServiceClick={(sId) => handleServiceSelect(sId)}
          hideHeader={true}
        />
        <ServicePricingSection
          selectedServiceId={selectedPricingServiceId}
          onOrderClick={(sId, pId) => handleOpenOrder(sId, pId)}
        />
      </div>
      <Footer onOpenBooking={() => handleOpenOrder()} />
      <NavbarFloatingDock onOpenBooking={(sId) => handleOpenOrder(sId)} />

      <ServiceDetailModal
        serviceId={detailServiceId}
        onClose={() => setDetailServiceId(null)}
        onOrderPackage={(serviceId, packageId) => {
          setDetailServiceId(null);
          handleOpenOrder(serviceId, packageId);
        }}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => { setOrderModalOpen(false); setOrderServiceId(undefined); setOrderPackageId(undefined); }}
        initialServiceId={orderServiceId}
        initialPackageId={orderPackageId}
      />
    </main>
  );
}
