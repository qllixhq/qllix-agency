"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { AgencyService, ServiceCategory, ServicePackage } from "@/lib/cmsStore";
import { SERVICE_BUNDLES } from "@/components/ServicesOverview";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, X, Check, ArrowUp, ArrowDown,
  Sparkles, Share2, Package as PackageIcon, Film, Clapperboard, Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers, GripVertical, CheckCircle2, Zap, Clock, ShieldCheck, Tag, ChevronRight,
} from "lucide-react";

const ICON_OPTIONS = [
  "Sparkles", "Share2", "Package", "Film", "Clapperboard", "Palette",
  "TrendingUp", "Globe", "Flag", "Calendar", "PlayCircle", "BookOpen", "Layers"
];

const CATEGORIES: ServiceCategory[] = [
  "Graphic Design", "Video & Motion", "Branding", "Digital Marketing", "Social Media"
];

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Share2, Package: PackageIcon, Film, Clapperboard, Palette,
  TrendingUp, Globe, Flag, Calendar, PlayCircle, BookOpen, Layers,
};

// Default template for 3 packages
function createDefaultPackages(serviceId: string, serviceName: string): ServicePackage[] {
  return [
    {
      id: `pkg-${serviceId || Date.now()}-basic`,
      serviceId: serviceId || "",
      name: "Basic",
      price: 1500,
      discountPrice: undefined,
      shortDesc: `Starter package for ${serviceName || "this service"}`,
      deliveryDays: 7,
      revisions: 3,
      features: [
        "2 Initial Concepts",
        "3 Revisions Included",
        "High-Resolution JPG & PNG",
        "Transparent Background",
        "Standard 7 Days Delivery",
      ],
      active: true,
      isPopular: false,
      displayOrder: 1,
      ctaText: "Get Started",
      isMonthly: false,
    },
    {
      id: `pkg-${serviceId || Date.now()}-business`,
      serviceId: serviceId || "",
      name: "Business",
      price: 3500,
      discountPrice: undefined,
      shortDesc: `Most popular comprehensive package for ${serviceName || "this service"}`,
      deliveryDays: 5,
      revisions: 5,
      features: [
        "4 Unique Concepts",
        "5 Revisions Included",
        "Vector Source Files (AI/EPS/PSD)",
        "Mockup Presentation",
        "Priority Support",
        "Express 5 Days Delivery",
      ],
      active: true,
      isPopular: true,
      badge: "Most Popular",
      displayOrder: 2,
      ctaText: "Get Started",
      isMonthly: false,
    },
    {
      id: `pkg-${serviceId || Date.now()}-premium`,
      serviceId: serviceId || "",
      name: "Premium",
      price: 6000,
      discountPrice: undefined,
      shortDesc: `Full VIP package with all assets for ${serviceName || "this service"}`,
      deliveryDays: 3,
      revisions: "Unlimited",
      features: [
        "6 VIP Unique Concepts",
        "Unlimited Revisions",
        "All Source & Print-Ready Files",
        "Complete Brand Style Guide",
        "Dedicated Creative Director",
        "VIP Express 3 Days Delivery",
      ],
      active: true,
      isPopular: false,
      displayOrder: 3,
      ctaText: "Get Started",
      isMonthly: false,
    },
  ];
}

export default function AdminServicesPage() {
  const {
    cmsData,
    deleteService,
    reorderServices,
    saveServiceWithPackages,
    updateService,
  } = useCms();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [gridDensity, setGridDensity] = useState<"auto" | "4" | "5" | "6">("4");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper for responsive grid columns (Default 4 per row as requested)
  const getGridColsClass = () => {
    switch (gridDensity) {
      case "5":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      case "6":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
      case "4":
      case "auto":
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4";
    }
  };

  // Full price formatting as requested (e.g. ৳1,500, ৳3,500, ৳6,000)
  const formatFullPrice = (price: number) => {
    if (!price && price !== 0) return "৳0";
    return `৳${price.toLocaleString()}`;
  };

  // Helper to resolve service thumbnail image from upload or showcase bundle
  const getServiceThumbnail = (service: AgencyService): string => {
    if (service.cardMockupCenter && service.cardMockupCenter.trim()) {
      return service.cardMockupCenter;
    }
    if (SERVICE_BUNDLES[service.id]?.center) {
      return SERVICE_BUNDLES[service.id].center;
    }
    const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (SERVICE_BUNDLES[slug]?.center) {
      return SERVICE_BUNDLES[slug].center;
    }
    if (service.category === "Video & Motion") return "/images/showcase/card_r2_05_venex.png";
    if (service.category === "Branding") return "/images/showcase/card_r1_04_gridline.png";
    if (service.category === "Digital Marketing") return "/images/showcase/card_r1_02_affine.png";
    if (service.category === "Social Media") return "/images/showcase/card_r1_05_ter.png";
    return "/images/showcase/card_r2_02_yantrik.png";
  };

  // Drag-and-drop state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Modal editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"service" | "packages">("service");
  const [selectedPkgTab, setSelectedPkgTab] = useState<number>(0); // 0 = Basic, 1 = Business, 2 = Premium
  const [featureInput, setFeatureInput] = useState("");

  // Form state
  const [serviceForm, setServiceForm] = useState<AgencyService>({
    id: "",
    name: "",
    shortDesc: "",
    longDesc: "",
    icon: "Sparkles",
    category: "Graphic Design",
    active: true,
    featured: false,
    displayOrder: 1,
    cardMockupLeft: "",
    cardMockupCenter: "",
    cardMockupRight: "",
    cardPriceText: "",
  });

  const [packagesForm, setPackagesForm] = useState<ServicePackage[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const services = [...(cmsData.agencyServices || [])].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === "all" || s.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Open modal for new service
  const handleOpenNew = () => {
    const newId = `svc-${Date.now()}`;
    const newSvc: AgencyService = {
      id: newId,
      name: "",
      shortDesc: "",
      longDesc: "",
      icon: "Sparkles",
      category: "Graphic Design",
      active: true,
      featured: false,
      displayOrder: services.length + 1,
      cardMockupLeft: "",
      cardMockupCenter: "",
      cardMockupRight: "",
      cardPriceText: "",
    };

    setServiceForm(newSvc);
    setPackagesForm(createDefaultPackages(newId, "New Service"));
    setIsNew(true);
    setActiveModalTab("service");
    setSelectedPkgTab(0);
    setFeatureInput("");
    setIsModalOpen(true);
  };

  // Open modal for editing existing service & its 3 packages
  const handleOpenEdit = (svc: AgencyService) => {
    setServiceForm({ ...svc });
    // Find existing packages for this service
    const existingPkgs = (cmsData.packages || [])
      .filter((p) => p.serviceId === svc.id)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    // If less than 3, complement with default packages
    if (existingPkgs.length === 3) {
      setPackagesForm(existingPkgs);
    } else {
      const defaults = createDefaultPackages(svc.id, svc.name);
      const combined = [
        existingPkgs[0] || defaults[0],
        existingPkgs[1] || defaults[1],
        existingPkgs[2] || defaults[2],
      ].map((p, idx) => ({ ...p, serviceId: svc.id, displayOrder: idx + 1 }));
      setPackagesForm(combined);
    }

    setIsNew(false);
    setActiveModalTab("service");
    setSelectedPkgTab(0);
    setFeatureInput("");
    setIsModalOpen(true);
  };

  // Drag and Drop reordering logic
  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const reordered = [...services];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    reorderServices(reordered);
    showToast(`✨ Reordered: "${moved.name}" moved to position #${toIndex + 1}!`);
  };

  const handleNudge = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;
    handleReorder(index, targetIndex);
  };

  // Save Service & 3 Packages simultaneously
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) {
      alert("Please enter a service name.");
      return;
    }

    const svcId = serviceForm.id || `svc-${Date.now()}`;
    const finalizedService: AgencyService = {
      ...serviceForm,
      id: svcId,
    };

    // Ensure all 3 packages have correct serviceId & displayOrder
    const finalizedPackages = packagesForm.map((pkg, idx) => ({
      ...pkg,
      id: pkg.id || `pkg-${svcId}-${idx + 1}-${Date.now()}`,
      serviceId: svcId,
      displayOrder: idx + 1,
    }));

    saveServiceWithPackages(finalizedService, finalizedPackages);
    showToast(isNew ? "🎉 Service & 3 Packages created!" : "✅ Service & Packages updated successfully!");
    setIsModalOpen(false);
  };

  // Delete service & its packages
  const handleDeleteService = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" and all its packages?`)) {
      deleteService(id);
      showToast(`Service "${name}" deleted.`);
    }
  };

  // Package features management inside modal
  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const currentPkg = packagesForm[selectedPkgTab];
    if (!currentPkg) return;

    const updatedFeatures = [...(currentPkg.features || []), featureInput.trim()];
    const updatedPkgs = [...packagesForm];
    updatedPkgs[selectedPkgTab] = { ...currentPkg, features: updatedFeatures };
    setPackagesForm(updatedPkgs);
    setFeatureInput("");
  };

  const handleRemoveFeature = (featIdx: number) => {
    const currentPkg = packagesForm[selectedPkgTab];
    if (!currentPkg) return;

    const updatedFeatures = (currentPkg.features || []).filter((_, i) => i !== featIdx);
    const updatedPkgs = [...packagesForm];
    updatedPkgs[selectedPkgTab] = { ...currentPkg, features: updatedFeatures };
    setPackagesForm(updatedPkgs);
  };

  const handleUpdateCurrentPkg = (partial: Partial<ServicePackage>) => {
    const currentPkg = packagesForm[selectedPkgTab];
    if (!currentPkg) return;
    const updatedPkgs = [...packagesForm];
    updatedPkgs[selectedPkgTab] = { ...currentPkg, ...partial };
    setPackagesForm(updatedPkgs);
  };

  // Image Upload helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const img = new Image();
      img.onload = () => {
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setServiceForm((prev) => ({ ...prev, cardMockupCenter: compressed }));
        } else {
          setServiceForm((prev) => ({ ...prev, cardMockupCenter: reader.result as string }));
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <AdminHeader
        title="Services & Packages Dashboard"
        subtitle="Drag & drop to reorder services. Manage each service and its 3 packages together in unified cards."
        actionButton={
          <button
            onClick={handleOpenNew}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Service</span>
          </button>
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#00FF87] text-[#02180C] font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Controls Bar: Search, Category Filter, and Column Density Switcher */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 bg-[#0A0F14]/60 border border-white/[0.06] p-3 rounded-2xl">
          {/* Left: Search Input & Category Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative w-full sm:w-64 lg:w-80">
              <input
                type="text"
                placeholder="Search services or packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#050A0F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF87]/50 focus:ring-1 focus:ring-[#00FF87]/30 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === "all"
                    ? "bg-[#00FF87] text-[#02180C] font-bold"
                    : "bg-white/[0.04] text-slate-400 hover:text-white"
                }`}
              >
                All ({services.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = services.filter((s) => s.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      filterCategory === cat
                        ? "bg-[#00FF87] text-[#02180C] font-bold"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Grid Column Density Controls (4, 5, 6 per row) */}
          <div className="flex items-center justify-between xl:justify-end gap-2.5 pt-2 xl:pt-0 border-t xl:border-t-0 border-white/[0.06]">
            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl">
              <span className="text-[10px] font-mono text-slate-500 px-1.5 uppercase hidden sm:inline">Density:</span>
              <button
                type="button"
                onClick={() => setGridDensity("4")}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  gridDensity === "4" ? "bg-[#00FF87] text-[#02180C] shadow-xs" : "text-slate-400 hover:text-white"
                }`}
                title="Force 4 cards per row"
              >
                4 / row
              </button>
              <button
                type="button"
                onClick={() => setGridDensity("5")}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  gridDensity === "5" ? "bg-[#00FF87] text-[#02180C] shadow-xs" : "text-slate-400 hover:text-white"
                }`}
                title="Force 5 cards per row"
              >
                5 / row
              </button>
              <button
                type="button"
                onClick={() => setGridDensity("6")}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  gridDensity === "6" ? "bg-[#00FF87] text-[#02180C] shadow-xs" : "text-slate-400 hover:text-white"
                }`}
                title="Force 6 cards per row"
              >
                6 / row
              </button>
              <button
                type="button"
                onClick={() => setGridDensity("auto")}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  gridDensity === "auto" ? "bg-[#00FF87] text-[#02180C] shadow-xs" : "text-slate-400 hover:text-white"
                }`}
                title="Auto responsive columns (4-6 per row)"
              >
                Auto (4-6)
              </button>
            </div>

            <span className="font-mono text-[11px] text-[#00FF87] bg-[#00FF87]/10 px-2.5 py-1 rounded-lg border border-[#00FF87]/20 whitespace-nowrap">
              {filteredServices.length} Services
            </span>
          </div>
        </div>

        {/* Drag Instruction Banner */}
        <div className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GripVertical className="w-3.5 h-3.5 text-[#00FF87]" />
            <span>
              <strong className="text-white">Smart Reorder:</strong> Drag cards by the handle <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">⋮⋮</kbd> or click <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↓</kbd> to reorder. Live site updates instantly.
            </span>
          </div>
        </div>

        {/* ═══ SERVICES & PACKAGES COMPACT SMART CARD GRID (4-6 PER LINE) ═══ */}
        <div className={`grid ${getGridColsClass()} gap-3`}>
          {filteredServices.map((service, index) => {
            const ServiceIcon = ICON_MAP[service.icon] || Sparkles;
            const pkgs = (cmsData.packages || [])
              .filter((p) => p.serviceId === service.id)
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

            // Extract the 3 package tiers
            const basicPkg = pkgs[0] || { name: "Basic", price: 1500, deliveryDays: 7, revisions: 3, features: [] };
            const bizPkg = pkgs[1] || { name: "Business", price: 3500, deliveryDays: 5, revisions: 5, isPopular: true, features: [] };
            const premPkg = pkgs[2] || { name: "Premium", price: 6000, deliveryDays: 3, revisions: "Unlimited", features: [] };

            const isBeingDragged = draggedIdx === index;
            const isDragOver = dragOverIdx === index;

            return (
              <div
                key={service.id}
                draggable
                onDragStart={(e) => {
                  setDraggedIdx(index);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragOverIdx !== index) setDragOverIdx(index);
                }}
                onDragLeave={() => {
                  if (dragOverIdx === index) setDragOverIdx(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedIdx !== null && draggedIdx !== index) {
                    handleReorder(draggedIdx, index);
                  }
                  setDraggedIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => {
                  setDraggedIdx(null);
                  setDragOverIdx(null);
                }}
                className={`rounded-xl bg-[#0A0F14] border transition-all duration-200 p-3 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                  isBeingDragged
                    ? "opacity-30 scale-95 border-dashed border-[#00FF87]"
                    : isDragOver
                    ? "border-[#00FF87] ring-2 ring-[#00FF87]/30 scale-[1.01]"
                    : "border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0D141B]"
                }`}
              >
                <div>
                  {/* 1. Top Card Bar: Drag Handle, Position Badge, Arrows, Active & Featured */}
                  <div className="flex items-center justify-between gap-1 pb-2 mb-2.5 border-b border-white/[0.06]">
                    {/* Left: Drag Handle, Position Badge & Quick Nudge */}
                    <div className="flex items-center gap-1">
                      <div
                        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-3.5 h-3.5" />
                      </div>

                      <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                        #{service.displayOrder || index + 1}
                      </span>

                      {/* Arrow Buttons */}
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNudge(index, "up");
                          }}
                          disabled={index === 0}
                          className="p-0.5 rounded text-slate-500 hover:text-[#00FF87] hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNudge(index, "down");
                          }}
                          disabled={index === services.length - 1}
                          className="p-0.5 rounded text-slate-500 hover:text-[#00FF87] hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Right: Active Toggle & Featured Star */}
                    <div className="flex items-center gap-1.5">
                      {/* Active Status Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateService(service.id, { active: !service.active });
                          showToast(`"${service.name}" is now ${!service.active ? "Active" : "Hidden"}`);
                        }}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                          service.active
                            ? "bg-emerald-500/15 text-[#00FF87] border border-emerald-500/30"
                            : "bg-white/[0.04] text-slate-500 border border-white/10"
                        }`}
                        title={service.active ? "Visible on site (Click to hide)" : "Hidden (Click to show)"}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${service.active ? "bg-[#00FF87]" : "bg-slate-500"}`} />
                        <span>{service.active ? "Active" : "Off"}</span>
                      </button>

                      {/* Featured Star Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateService(service.id, { featured: !service.featured });
                          showToast(`"${service.name}" ${!service.featured ? "Featured" : "Unfeatured"}`);
                        }}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          service.featured
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "text-slate-600 hover:text-slate-300 hover:bg-white/5"
                        }`}
                        title={service.featured ? "Featured on homepage" : "Click to feature"}
                      >
                        <Star className={`w-3 h-3 ${service.featured ? "fill-amber-400" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* 2. Service Core Identity: Thumbnail Image + Name + Category */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {/* Service Thumbnail Image */}
                    <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden bg-black/60 shrink-0 aspect-square shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getServiceThumbnail(service)}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-white truncate" title={service.name}>
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-400 truncate">
                          {service.category}
                        </span>
                        {service.cardPriceText && (
                          <span className="text-[9px] font-mono text-[#00FF87] bg-[#00FF87]/10 px-1.5 py-0.2 rounded border border-[#00FF87]/20 truncate">
                            {service.cardPriceText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. Smart Micro 3-Packages Bar */}
                  <div className="bg-black/40 rounded-lg p-1.5 border border-white/[0.05] mb-2.5">
                    <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 mb-1 px-0.5 uppercase">
                      <span>3 Packages</span>
                      <span className="text-slate-500">Basic · Biz · Prem</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      {/* Basic Tier */}
                      <div
                        className="p-1.5 rounded bg-white/[0.02] border border-white/[0.04] text-center"
                        title={`${basicPkg.name}: ৳${(basicPkg.discountPrice ?? basicPkg.price ?? 0).toLocaleString()} · ${basicPkg.deliveryDays || 7}d · ${basicPkg.revisions || 3} revs`}
                      >
                        <div className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                          {basicPkg.name || "Basic"}
                        </div>
                        <div className="font-mono text-xs font-bold text-white mt-0.5 truncate">
                          {formatFullPrice(basicPkg.discountPrice ?? basicPkg.price ?? 0)}
                        </div>
                        <div className="text-[8px] text-slate-500 font-mono mt-0.5 truncate">
                          {basicPkg.deliveryDays || 7}d · {basicPkg.revisions || 3}r
                        </div>
                      </div>

                      {/* Business Tier (Popular Highlight) */}
                      <div
                        className="p-1.5 rounded bg-[#00FF87]/[0.08] border border-[#00FF87]/30 text-center relative"
                        title={`${bizPkg.name}: ৳${(bizPkg.discountPrice ?? bizPkg.price ?? 0).toLocaleString()} · ${bizPkg.deliveryDays || 5}d · ${bizPkg.revisions || 5} revs (Most Popular)`}
                      >
                        <div className="text-[8.5px] font-bold text-[#00FF87] uppercase tracking-wider flex items-center justify-center gap-0.5 truncate">
                          <span>{bizPkg.name || "Biz"}</span>
                          <span className="text-[7.5px]">★</span>
                        </div>
                        <div className="font-mono text-xs font-black text-[#00FF87] mt-0.5 truncate">
                          {formatFullPrice(bizPkg.discountPrice ?? bizPkg.price ?? 0)}
                        </div>
                        <div className="text-[8px] text-emerald-400/80 font-mono mt-0.5 truncate">
                          {bizPkg.deliveryDays || 5}d · {bizPkg.revisions || 5}r
                        </div>
                      </div>

                      {/* Premium Tier */}
                      <div
                        className="p-1.5 rounded bg-white/[0.02] border border-white/[0.04] text-center"
                        title={`${premPkg.name}: ৳${(premPkg.discountPrice ?? premPkg.price ?? 0).toLocaleString()} · ${premPkg.deliveryDays || 3}d · ${premPkg.revisions || "∞"} revs`}
                      >
                        <div className="text-[8.5px] font-semibold text-amber-300 uppercase tracking-wider truncate">
                          {premPkg.name || "Prem"}
                        </div>
                        <div className="font-mono text-xs font-bold text-white mt-0.5 truncate">
                          {formatFullPrice(premPkg.discountPrice ?? premPkg.price ?? 0)}
                        </div>
                        <div className="text-[8px] text-slate-500 font-mono mt-0.5 truncate">
                          {premPkg.deliveryDays || 3}d · {premPkg.revisions === "Unlimited" ? "∞" : `${premPkg.revisions || "∞"}r`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Card Bottom Actions: Edit & Trash */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/[0.05] hover:bg-[#00FF87] text-slate-300 hover:text-[#02180C] text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer group shadow-xs active:scale-98"
                  >
                    <Pencil className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    <span>Edit &amp; Packages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteService(service.id, service.name)}
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                    title="Delete service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* UNIFIED MODAL: ADD / EDIT SERVICE & ITS 3 PACKAGES TOGETHER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0F14] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00FF87]" />
                  <span>{isNew ? "Add New Service & 3 Packages" : `Edit Service — ${serviceForm.name}`}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure the service identity and its Basic, Business &amp; Premium packages in one place.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Tabs (Service Details vs Packages) */}
            <div className="flex border-b border-white/10 bg-black/40 px-6 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveModalTab("service")}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeModalTab === "service"
                    ? "bg-[#0A0F14] text-[#00FF87] border-t-2 border-[#00FF87]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>1. Service Details</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab("packages")}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeModalTab === "packages"
                    ? "bg-[#0A0F14] text-[#00FF87] border-t-2 border-[#00FF87]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>2. The 3 Packages (Basic · Business · Premium)</span>
                <span className="text-[10px] bg-[#00FF87]/20 text-[#00FF87] px-1.5 py-0.5 rounded font-mono">3 Tiers</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSaveModal} className="overflow-y-auto p-6 space-y-6 flex-1">
              {activeModalTab === "service" ? (
                /* TAB 1: SERVICE DETAILS */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Service Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Logo Design, Digital Marketing"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/50"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Category *</label>
                      <select
                        value={serviceForm.category}
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]/50 cursor-pointer"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} className="bg-[#0A0F14]">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Icon Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Lucide Icon</label>
                      <select
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]/50 cursor-pointer"
                      >
                        {ICON_OPTIONS.map((ico) => (
                          <option key={ico} value={ico} className="bg-[#0A0F14]">
                            {ico}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Card Starting Price Text */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Starting Price Badge (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Starts at ৳1,500 or ৳5,000/mo"
                        value={serviceForm.cardPriceText || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, cardPriceText: e.target.value })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/50"
                      />
                    </div>

                    {/* Short Description */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Short Description (for Cards &amp; Grid)</label>
                      <input
                        type="text"
                        placeholder="Brief 1-2 sentence description"
                        value={serviceForm.shortDesc}
                        onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/50"
                      />
                    </div>

                    {/* Long Description */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Full Description (Shown in Detail Modal)</label>
                      <textarea
                        rows={3}
                        placeholder="Detailed overview of what this service delivers..."
                        value={serviceForm.longDesc}
                        onChange={(e) => setServiceForm({ ...serviceForm, longDesc: e.target.value })}
                        className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/50 resize-none"
                      />
                    </div>
                  </div>

                  {/* 1:1 Thumbnail Image Upload */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#00FF87]">Service Card Thumbnail (1:1 Square)</h4>
                        <p className="text-[11px] text-slate-400">Upload an image or paste an image URL.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl border border-white/15 bg-black/60 overflow-hidden shrink-0 aspect-square">
                        {serviceForm.cardMockupCenter ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={serviceForm.cardMockupCenter} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600 font-mono">1:1</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#00FF87]/20 file:text-[#00FF87] hover:file:bg-[#00FF87]/30 cursor-pointer w-full"
                        />
                        <input
                          type="text"
                          placeholder="Or paste direct image URL (https://...)"
                          value={serviceForm.cardMockupCenter || ""}
                          onChange={(e) => setServiceForm({ ...serviceForm, cardMockupCenter: e.target.value })}
                          className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Checkboxes */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={serviceForm.active}
                        onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })}
                        className="accent-[#00FF87]"
                      />
                      <span>Active (Visible on website)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={serviceForm.featured}
                        onChange={(e) => setServiceForm({ ...serviceForm, featured: e.target.checked })}
                        className="accent-[#00FF87]"
                      />
                      <span>Featured on Homepage</span>
                    </label>
                  </div>
                </div>
              ) : (
                /* TAB 2: THE 3 PACKAGES */
                <div className="space-y-5">
                  {/* Package Selector Pills */}
                  <div className="flex items-center gap-2 p-1.5 bg-black/60 rounded-2xl border border-white/10">
                    {packagesForm.map((pkg, pIdx) => {
                      const isSel = selectedPkgTab === pIdx;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setSelectedPkgTab(pIdx)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            isSel
                              ? "bg-[#00FF87] text-[#02180C] shadow-sm font-black"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>{pIdx + 1}. {pkg.name || `Package ${pIdx + 1}`}</span>
                          {pkg.isPopular && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/20 text-[#02180C] font-mono">
                              POPULAR
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Package Fields */}
                  {packagesForm[selectedPkgTab] && (() => {
                    const currentPkg = packagesForm[selectedPkgTab];
                    return (
                      <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Plan Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Package Name *</label>
                            <input
                              type="text"
                              value={currentPkg.name}
                              onChange={(e) => handleUpdateCurrentPkg({ name: e.target.value })}
                              placeholder="Basic / Business / Premium"
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>

                          {/* Regular Price (BDT) */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Regular Price (৳ BDT) *</label>
                            <input
                              type="number"
                              value={currentPkg.price}
                              onChange={(e) => handleUpdateCurrentPkg({ price: Number(e.target.value) || 0 })}
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>

                          {/* Discount Price (Optional) */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Base Sale Price (Optional ৳)</label>
                            <input
                              type="number"
                              value={currentPkg.discountPrice ?? ""}
                              onChange={(e) => handleUpdateCurrentPkg({ discountPrice: e.target.value ? Number(e.target.value) : undefined })}
                              placeholder="Leave blank if standard"
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>

                          {/* Delivery Days */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Delivery Days</label>
                            <input
                              type="number"
                              value={currentPkg.deliveryDays || 3}
                              onChange={(e) => handleUpdateCurrentPkg({ deliveryDays: Number(e.target.value) || 1 })}
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>

                          {/* Revisions */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Revisions (e.g. 3, 5, Unlimited)</label>
                            <input
                              type="text"
                              value={currentPkg.revisions || ""}
                              onChange={(e) => handleUpdateCurrentPkg({ revisions: e.target.value })}
                              placeholder='e.g. 3 or "Unlimited"'
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>

                          {/* Badge */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400">Badge (e.g. Most Popular)</label>
                            <input
                              type="text"
                              value={currentPkg.badge || ""}
                              onChange={(e) => handleUpdateCurrentPkg({ badge: e.target.value || undefined })}
                              placeholder="Optional pill label"
                              className="w-full bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]/50"
                            />
                          </div>
                        </div>

                        {/* Features Editor */}
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <label className="text-xs font-mono text-slate-400">Package Features Checklist</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={featureInput}
                              onChange={(e) => setFeatureInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddFeature();
                                }
                              }}
                              placeholder="Type a feature and press Enter or click 'Add Feature'..."
                              className="flex-1 bg-[#050A0F] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00FF87]/50"
                            />
                            <button
                              type="button"
                              onClick={handleAddFeature}
                              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#00FF87] hover:text-[#02180C] text-xs font-bold transition-colors cursor-pointer"
                            >
                              Add Feature
                            </button>
                          </div>

                          {/* Feature tags list */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {(currentPkg.features || []).map((feat, fIdx) => (
                              <span
                                key={fIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-200"
                              >
                                <span>{feat}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeature(fIdx)}
                                  className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                  title="Remove feature"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex items-center gap-6 pt-2">
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer font-medium">
                            <input
                              type="checkbox"
                              checked={currentPkg.isPopular}
                              onChange={(e) => handleUpdateCurrentPkg({ isPopular: e.target.checked })}
                              className="accent-[#00FF87]"
                            />
                            <span>Highlight as Most Popular</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer font-medium">
                            <input
                              type="checkbox"
                              checked={currentPkg.isMonthly}
                              onChange={(e) => handleUpdateCurrentPkg({ isMonthly: e.target.checked })}
                              className="accent-[#00FF87]"
                            />
                            <span>Monthly Retainer (/month)</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer font-medium">
                            <input
                              type="checkbox"
                              checked={currentPkg.active}
                              onChange={(e) => handleUpdateCurrentPkg({ active: e.target.checked })}
                              className="accent-[#00FF87]"
                            />
                            <span>Active</span>
                          </label>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {activeModalTab === "service" ? (
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("packages")}
                      className="text-[#00FF87] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span>Next: Configure 3 Packages</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("service")}
                      className="text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span>Back: Service Details</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] text-xs font-black transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Save Service &amp; 3 Packages</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
