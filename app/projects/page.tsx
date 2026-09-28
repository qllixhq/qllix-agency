"use client";

import React, { useState } from "react";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import Footer from "@/components/Footer";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";
import PortfolioSection from "@/components/PortfolioSection";
import OrderModal from "@/components/OrderModal";

export default function ProjectsPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderServiceId, setOrderServiceId] = useState<string | undefined>();
  const [orderPackageId, setOrderPackageId] = useState<string | undefined>();

  const handleOpenOrder = (serviceId?: string, packageId?: string) => {
    setOrderServiceId(serviceId);
    setOrderPackageId(packageId);
    setOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#07050E] text-slate-900 overflow-x-hidden">
      {/* Signature Top Banner with Centered Logo & Breadcrumbs (No Button, No Subtitle) */}
      <SubpageHeroBanner 
        pageKey="projects" 
        title={<span>Crafted with <em className="text-[#00FF87] not-italic font-serif">Precision</em></span>}
      />

      {/* ═══ WHITE SHEET CONTENT WRAPPER ═══ */}
      <div className="relative z-10 bg-white -mt-6 sm:-mt-8 pt-6 sm:pt-10 pb-20 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5">
        <PortfolioSection onOrderClick={() => handleOpenOrder()} hideHeader={true} />
      </div>

      <Footer onOpenBooking={() => handleOpenOrder()} />
      <NavbarFloatingDock onOpenBooking={(sId) => handleOpenOrder(sId)} />
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => { setOrderModalOpen(false); setOrderServiceId(undefined); setOrderPackageId(undefined); }}
        initialServiceId={orderServiceId}
        initialPackageId={orderPackageId}
      />
    </main>
  );
}
