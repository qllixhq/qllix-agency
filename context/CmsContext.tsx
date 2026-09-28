"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import {
  CmsData,
  DEFAULT_CMS_DATA,
  CMS_STORAGE_KEY,
  HeroBannerConfig,
  ContactPageConfig,
  SiteGeneralConfig,
  InquiryLead,
  ShowcaseItem,
  AgencyService,
  ServicePackage,
  AgencyOrder,
  OrderStatus,
  PortfolioItem,
  AgencyTestimonial,
  AgencyFAQ,
  HomeSectionConfig,
  TeamMember,
  CampaignOffer,
  AffiliateProgramConfig,
  AffiliatePartner,
  AffiliateLead,
} from "@/lib/cmsStore";

// ─────────────────────────────────────────────────────────────
// CONTEXT TYPE
// ─────────────────────────────────────────────────────────────

export interface CloudSyncInfo {
  isCloudConnected: boolean;
  provider: string;
  lastSyncedAt: string | null;
  statusMessage: string;
}

interface CmsContextType {
  cmsData: CmsData;
  isLoaded: boolean;
  isSyncing: boolean;
  cloudSyncInfo: CloudSyncInfo;
  refreshLiveContent: () => Promise<void>;

  // General & Banners
  updateBanner: (page: keyof CmsData["banners"], config: Partial<HeroBannerConfig>) => void;
  updateContactPage: (config: Partial<ContactPageConfig>) => void;
  updateGeneral: (general: Partial<SiteGeneralConfig>) => void;

  // Showcase
  updateShowcaseItem: (row: "row1" | "row2", id: string, partial: Partial<ShowcaseItem>) => void;
  addShowcaseItem: (row: "row1" | "row2", item: ShowcaseItem) => void;
  deleteShowcaseItem: (row: "row1" | "row2", id: string) => void;

  // Legacy Inquiries (BookingModal)
  addInquiry: (inquiry: Omit<InquiryLead, "id" | "createdAt" | "status">) => void;
  updateInquiryStatus: (id: string, status: InquiryLead["status"]) => void;
  deleteInquiry: (id: string) => void;

  // Agency Services
  addService: (service: AgencyService) => void;
  updateService: (id: string, partial: Partial<AgencyService>) => void;
  deleteService: (id: string) => void;
  reorderServices: (reorderedServices: AgencyService[]) => void;
  saveServiceWithPackages: (service: AgencyService, packages: ServicePackage[]) => void;

  // Service Packages
  addPackage: (pkg: ServicePackage) => void;
  updatePackage: (id: string, partial: Partial<ServicePackage>) => void;
  deletePackage: (id: string) => void;
  getPackagesForService: (serviceId: string) => ServicePackage[];
  getStartingPrice: (serviceId: string) => number | null;

  // Orders
  addOrder: (order: Omit<AgencyOrder, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;

  // Portfolio
  addPortfolioItem: (item: PortfolioItem) => void;
  updatePortfolioItem: (id: string, partial: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;

  // Testimonials
  addTestimonial: (t: AgencyTestimonial) => void;
  updateTestimonial: (id: string, partial: Partial<AgencyTestimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // FAQs
  addFAQ: (faq: AgencyFAQ) => void;
  updateFAQ: (id: string, partial: Partial<AgencyFAQ>) => void;
  deleteFAQ: (id: string) => void;

  // Home Sections
  updateHomeSection: (id: string, partial: Partial<HomeSectionConfig>) => void;
  reorderHomeSections: (sections: HomeSectionConfig[]) => void;

  // Team Members
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, partial: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Footer orbit images
  updateFooterOrbitImages: (images: string[]) => void;

  // Campaigns & Offer Ads
  addCampaign: (campaign: CampaignOffer) => void;
  updateCampaign: (id: string, partial: Partial<CampaignOffer>) => void;
  deleteCampaign: (id: string) => void;
  toggleCampaignActive: (id: string) => void;

  // Affiliate & Referral Program
  updateAffiliateConfig: (config: Partial<AffiliateProgramConfig>) => void;
  addAffiliatePartner: (partner: AffiliatePartner) => void;
  updateAffiliatePartner: (id: string, partial: Partial<AffiliatePartner>) => void;
  deleteAffiliatePartner: (id: string) => void;
  addAffiliateLead: (lead: AffiliateLead) => void;
  updateAffiliateLead: (id: string, partial: Partial<AffiliateLead>) => void;
  deleteAffiliateLead: (id: string) => void;

  // System
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
}

// ─────────────────────────────────────────────────────────────
// HELPER: NORMALIZE & MERGE DATA SAFELY
// ─────────────────────────────────────────────────────────────

function normalizeCmsData(parsed: Partial<CmsData> | any): CmsData {
  if (!parsed || typeof parsed !== "object") return DEFAULT_CMS_DATA;

  const existingServices = (
    Array.isArray(parsed.agencyServices) && parsed.agencyServices.length > 0
      ? parsed.agencyServices
      : DEFAULT_CMS_DATA.agencyServices
  ).filter((s: any) => s && typeof s.id === "string");

  const existingPackages = (
    Array.isArray(parsed.packages) && parsed.packages.length > 0
      ? parsed.packages
      : DEFAULT_CMS_DATA.packages
  )
    .filter((p: any) => p && typeof p.id === "string")
    .map((p: any) => ({
      ...p,
      price: typeof p.price === "number" && !isNaN(p.price) ? p.price : (Number(p.price) || 0),
      discountPrice: typeof p.discountPrice === "number" && !isNaN(p.discountPrice) ? p.discountPrice : undefined,
      features: Array.isArray(p.features) ? p.features : [],
      active: p.active !== false,
    }));

  const existingHomeSections =
    Array.isArray(parsed.homeSections) && parsed.homeSections.length > 0
      ? parsed.homeSections
      : DEFAULT_CMS_DATA.homeSections;

  const existingTeam =
    Array.isArray(parsed.teamMembers) && parsed.teamMembers.length > 0
      ? parsed.teamMembers
      : DEFAULT_CMS_DATA.teamMembers;

  const existingFooterOrbitImages = Array.isArray(parsed.footerOrbitImages)
    ? parsed.footerOrbitImages.filter((image: unknown) => typeof image === "string" && image.trim())
    : DEFAULT_CMS_DATA.footerOrbitImages;

  const existingPortfolio =
    Array.isArray(parsed.portfolioItems) && parsed.portfolioItems.length > 0
      ? parsed.portfolioItems
      : DEFAULT_CMS_DATA.portfolioItems;

  const normalizedPortfolio = existingPortfolio
    .filter((project: any) => project && typeof project.id === "string")
    .map((project: any) => ({
      ...project,
      contentBlocks: Array.isArray(project.contentBlocks) ? project.contentBlocks : undefined,
    }));

  const existingTestimonials =
    Array.isArray(parsed.agencyTestimonials) && parsed.agencyTestimonials.length > 0
      ? parsed.agencyTestimonials
      : DEFAULT_CMS_DATA.agencyTestimonials;

  const existingFaqs =
    Array.isArray(parsed.agencyFaqs) && parsed.agencyFaqs.length > 0
      ? parsed.agencyFaqs
      : DEFAULT_CMS_DATA.agencyFaqs;

  const rawCampaigns =
    Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0
      ? parsed.campaigns
      : DEFAULT_CMS_DATA.campaigns;
  const existingCampaigns = (rawCampaigns || []).map((c: any) => ({
    ...c,
    imageUrl:
      !c.imageUrl || c.imageUrl.includes("fitmate.png")
        ? "/images/campaign-banner.jpg"
        : c.imageUrl,
  }));

  const existingAffiliateConfig: AffiliateProgramConfig = {
    enabled: parsed.affiliateConfig?.enabled ?? DEFAULT_CMS_DATA.affiliateConfig!.enabled,
    minProjectAmount:
      parsed.affiliateConfig?.minProjectAmount ??
      DEFAULT_CMS_DATA.affiliateConfig!.minProjectAmount,
    commissionPercent:
      parsed.affiliateConfig?.commissionPercent ??
      DEFAULT_CMS_DATA.affiliateConfig!.commissionPercent,
    badge: parsed.affiliateConfig?.badge ?? DEFAULT_CMS_DATA.affiliateConfig!.badge,
    title: parsed.affiliateConfig?.title ?? DEFAULT_CMS_DATA.affiliateConfig!.title,
    subtitle: parsed.affiliateConfig?.subtitle ?? DEFAULT_CMS_DATA.affiliateConfig!.subtitle,
    ctaText: parsed.affiliateConfig?.ctaText ?? DEFAULT_CMS_DATA.affiliateConfig!.ctaText,
    secondaryCtaText:
      parsed.affiliateConfig?.secondaryCtaText ??
      DEFAULT_CMS_DATA.affiliateConfig!.secondaryCtaText,
    payoutTerms:
      parsed.affiliateConfig?.payoutTerms ?? DEFAULT_CMS_DATA.affiliateConfig!.payoutTerms,
  };

  return {
    ...DEFAULT_CMS_DATA,
    ...parsed,
    general: { ...DEFAULT_CMS_DATA.general, ...(parsed.general || {}) },
    banners: { ...DEFAULT_CMS_DATA.banners, ...(parsed.banners || {}) },
    contactPage: {
      ...DEFAULT_CMS_DATA.contactPage,
      ...(parsed.contactPage || {}),
      benefits: Array.isArray(parsed.contactPage?.benefits) ? parsed.contactPage.benefits : DEFAULT_CMS_DATA.contactPage.benefits,
      serviceOptions: Array.isArray(parsed.contactPage?.serviceOptions) ? parsed.contactPage.serviceOptions : DEFAULT_CMS_DATA.contactPage.serviceOptions,
      budgetOptions: Array.isArray(parsed.contactPage?.budgetOptions) ? parsed.contactPage.budgetOptions : DEFAULT_CMS_DATA.contactPage.budgetOptions,
    },
    showcase:
      parsed.showcase?.row1 && parsed.showcase?.row2
        ? parsed.showcase
        : DEFAULT_CMS_DATA.showcase,
    inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : DEFAULT_CMS_DATA.inquiries,
    agencyServices: existingServices,
    packages: existingPackages,
    orders: Array.isArray(parsed.orders) ? parsed.orders : DEFAULT_CMS_DATA.orders,
    portfolioItems: normalizedPortfolio,
    agencyTestimonials: existingTestimonials,
    agencyFaqs: existingFaqs,
    homeSections: existingHomeSections,
    teamMembers: existingTeam,
    footerOrbitImages: existingFooterOrbitImages,
    campaigns: existingCampaigns,
    affiliateConfig: existingAffiliateConfig,
    affiliatePartners: Array.isArray(parsed.affiliatePartners)
      ? parsed.affiliatePartners
      : DEFAULT_CMS_DATA.affiliatePartners,
    affiliateLeads: Array.isArray(parsed.affiliateLeads)
      ? parsed.affiliateLeads
      : DEFAULT_CMS_DATA.affiliateLeads,
    _lastModified: typeof parsed._lastModified === "number" ? parsed._lastModified : undefined,
  };
}

// ─────────────────────────────────────────────────────────────
// CREATE CONTEXT
// ─────────────────────────────────────────────────────────────

const CmsContext = createContext<CmsContextType | null>(null);

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cmsData, setCmsData] = useState<CmsData>(DEFAULT_CMS_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudSyncInfo, setCloudSyncInfo] = useState<CloudSyncInfo>({
    isCloudConnected: false,
    provider: "in_memory",
    lastSyncedAt: null,
    statusMessage: "Initializing data layer...",
  });

  const isSavingRef = useRef(false);

  // Function to pull live content from server
  const refreshLiveContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!res.ok) return;

      const result = await res.json();
      if (result.success && result.data) {
        const normalized = normalizeCmsData(result.data);
        setCmsData(normalized);
        try {
          localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(normalized));
        } catch (e) {
          console.warn("Could not save normalized data to localStorage:", e);
        }

        setCloudSyncInfo({
          isCloudConnected: Boolean(result.isCloudConnected),
          provider: result.provider || "upstash_redis",
          lastSyncedAt: result.storage?.lastSyncedAt || new Date().toLocaleTimeString(),
          statusMessage: result.storage?.statusMessage || "Live synchronized with cloud",
        });
      }
    } catch (err) {
      console.warn("[CmsContext] Background sync fetch error:", err);
    }
  }, []);

  // 1. Initial Load: check local storage for instant render, then fetch live from server
  useEffect(() => {
    try {
      // Clean up outdated storage versions
      try {
        localStorage.removeItem("qllix_cms_v1");
        localStorage.removeItem("qllix_cms_v2");
        localStorage.removeItem("qllix_cms_v3");
        localStorage.removeItem("qllix_cms_v4");
      } catch {}

      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCmsData(normalizeCmsData(parsed));
      }
    } catch (e) {
      console.warn("CMS localStorage load error:", e);
    } finally {
      setIsLoaded(true);
    }

    // Immediately fetch live from Vercel / server
    refreshLiveContent();

    // Re-check live updates when user focuses tab
    const handleFocus = () => {
      if (!isSavingRef.current) {
        refreshLiveContent();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") handleFocus();
    });

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshLiveContent]);

  // Save changes locally + POST to serverless route
  const saveState = useCallback(async (newData: CmsData): Promise<boolean> => {
    isSavingRef.current = true;
    const now = Date.now();
    const dataWithTimestamp: CmsData = {
      ...newData,
      _lastModified: now,
    };
    setCmsData(dataWithTimestamp);
    setIsSyncing(true);

    // Optimistically update localStorage for instant local feedback
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    } catch (e) {
      console.warn("CMS localStorage save warning (quota or storage full):", e);
    }

    // Sync to backend / Vercel cloud
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(dataWithTimestamp),
      });

      const json = await res.json();
      if (json.success) {
        setCloudSyncInfo({
          isCloudConnected: Boolean(json.isCloudConnected),
          provider: json.storage?.provider || "saved",
          lastSyncedAt: json.storage?.lastSyncedAt || new Date().toLocaleTimeString(),
          statusMessage: json.storage?.statusMessage || "Live updated successfully",
        });
        return true;
      } else {
        console.warn("[CmsContext] Cloud save returned error:", json.error);
        return false;
      }
    } catch (err) {
      console.error("[CmsContext] Cloud save network error:", err);
      return false;
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        isSavingRef.current = false;
      }, 500);
    }
  }, []);

  // ── General & Banners ──────────────────────────────────────

  const updateBanner = (page: keyof CmsData["banners"], config: Partial<HeroBannerConfig>) => {
    saveState({
      ...cmsData,
      banners: { ...cmsData.banners, [page]: { ...cmsData.banners[page], ...config } },
    });
  };

  const updateContactPage = (config: Partial<ContactPageConfig>) => {
    saveState({ ...cmsData, contactPage: { ...cmsData.contactPage, ...config } });
  };

  const updateGeneral = (general: Partial<SiteGeneralConfig>) => {
    saveState({ ...cmsData, general: { ...cmsData.general, ...general } });
  };

  // ── Showcase ───────────────────────────────────────────────

  const updateShowcaseItem = (
    row: "row1" | "row2",
    id: string,
    partial: Partial<ShowcaseItem>
  ) => {
    saveState({
      ...cmsData,
      showcase: {
        ...cmsData.showcase,
        [row]: cmsData.showcase[row].map((item) =>
          item.id === id ? { ...item, ...partial } : item
        ),
      },
    });
  };

  const addShowcaseItem = (row: "row1" | "row2", item: ShowcaseItem) => {
    saveState({
      ...cmsData,
      showcase: {
        ...cmsData.showcase,
        [row]: [...cmsData.showcase[row], item],
      },
    });
  };

  const deleteShowcaseItem = (row: "row1" | "row2", id: string) => {
    saveState({
      ...cmsData,
      showcase: {
        ...cmsData.showcase,
        [row]: cmsData.showcase[row].filter((i) => i.id !== id),
      },
    });
  };

  // ── Legacy Inquiries (Hero booking modal) ──────────────────

  const addInquiry = (inquiry: Omit<InquiryLead, "id" | "createdAt" | "status">) => {
    const newInq: InquiryLead = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    saveState({
      ...cmsData,
      inquiries: [newInq, ...cmsData.inquiries],
    });
  };

  const updateInquiryStatus = (id: string, status: InquiryLead["status"]) => {
    saveState({
      ...cmsData,
      inquiries: cmsData.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    });
  };

  const deleteInquiry = (id: string) => {
    saveState({
      ...cmsData,
      inquiries: cmsData.inquiries.filter((inq) => inq.id !== id),
    });
  };

  // ── Agency Services ────────────────────────────────────────

  const addService = (service: AgencyService) => {
    saveState({
      ...cmsData,
      agencyServices: [...cmsData.agencyServices, service],
    });
  };

  const updateService = (id: string, partial: Partial<AgencyService>) => {
    saveState({
      ...cmsData,
      agencyServices: cmsData.agencyServices.map((s) =>
        s.id === id ? { ...s, ...partial } : s
      ),
    });
  };

  const deleteService = (id: string) => {
    saveState({
      ...cmsData,
      agencyServices: cmsData.agencyServices.filter((s) => s.id !== id),
      packages: cmsData.packages.filter((p) => p.serviceId !== id),
    });
  };

  const reorderServices = (reorderedServices: AgencyService[]) => {
    const updated = reorderedServices.map((s, idx) => ({
      ...s,
      displayOrder: idx + 1,
    }));
    saveState({
      ...cmsData,
      agencyServices: updated,
    });
  };

  const saveServiceWithPackages = (
    service: AgencyService,
    packagesToSave: ServicePackage[]
  ) => {
    const isNew = !cmsData.agencyServices.some((s) => s.id === service.id);
    const updatedServices = isNew
      ? [...cmsData.agencyServices, service]
      : cmsData.agencyServices.map((s) => (s.id === service.id ? service : s));

    const otherPackages = cmsData.packages.filter((p) => p.serviceId !== service.id);
    const updatedPackages = [...otherPackages, ...packagesToSave];

    saveState({
      ...cmsData,
      agencyServices: updatedServices,
      packages: updatedPackages,
    });
  };

  // ── Service Packages ───────────────────────────────────────

  const addPackage = (pkg: ServicePackage) => {
    saveState({
      ...cmsData,
      packages: [...cmsData.packages, pkg],
    });
  };

  const updatePackage = (id: string, partial: Partial<ServicePackage>) => {
    saveState({
      ...cmsData,
      packages: cmsData.packages.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    });
  };

  const deletePackage = (id: string) => {
    saveState({
      ...cmsData,
      packages: cmsData.packages.filter((p) => p.id !== id),
    });
  };

  const getPackagesForService = useCallback(
    (serviceId: string) => {
      if (!Array.isArray(cmsData?.packages)) return [];
      return cmsData.packages
        .filter((p) => p && p.serviceId === serviceId && p.active)
        .sort((a, b) => (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0));
    },
    [cmsData?.packages]
  );

  const getStartingPrice = useCallback(
    (serviceId: string): number | null => {
      if (!Array.isArray(cmsData?.packages)) return null;
      const pkgs = cmsData.packages.filter((p) => p && p.serviceId === serviceId && p.active);
      if (pkgs.length === 0) return null;
      const validPrices = pkgs
        .map((p) => {
          if (typeof p.discountPrice === "number" && !isNaN(p.discountPrice) && p.discountPrice > 0) {
            return p.discountPrice;
          }
          if (typeof p.price === "number" && !isNaN(p.price) && p.price > 0) {
            return p.price;
          }
          const parsed = Number(p.price);
          return !isNaN(parsed) && parsed > 0 ? parsed : null;
        })
        .filter((pr): pr is number => typeof pr === "number" && !isNaN(pr) && pr > 0);

      if (validPrices.length === 0) return null;
      return Math.min(...validPrices);
    },
    [cmsData?.packages]
  );

  // ── Orders ─────────────────────────────────────────────────

  const addOrder = (order: Omit<AgencyOrder, "id" | "createdAt" | "status">) => {
    const newOrder: AgencyOrder = {
      ...order,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    saveState({
      ...cmsData,
      orders: [newOrder, ...cmsData.orders],
    });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    saveState({
      ...cmsData,
      orders: cmsData.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    });
  };

  const deleteOrder = (id: string) => {
    saveState({
      ...cmsData,
      orders: cmsData.orders.filter((o) => o.id !== id),
    });
  };

  // ── Portfolio ──────────────────────────────────────────────

  const addPortfolioItem = (item: PortfolioItem) => {
    saveState({
      ...cmsData,
      portfolioItems: [...cmsData.portfolioItems, item],
    });
  };

  const updatePortfolioItem = (id: string, partial: Partial<PortfolioItem>) => {
    saveState({
      ...cmsData,
      portfolioItems: cmsData.portfolioItems.map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    });
  };

  const deletePortfolioItem = (id: string) => {
    saveState({
      ...cmsData,
      portfolioItems: cmsData.portfolioItems.filter((p) => p.id !== id),
    });
  };

  // ── Testimonials ───────────────────────────────────────────

  const addTestimonial = (t: AgencyTestimonial) => {
    saveState({
      ...cmsData,
      agencyTestimonials: [...cmsData.agencyTestimonials, t],
    });
  };

  const updateTestimonial = (id: string, partial: Partial<AgencyTestimonial>) => {
    saveState({
      ...cmsData,
      agencyTestimonials: cmsData.agencyTestimonials.map((t) =>
        t.id === id ? { ...t, ...partial } : t
      ),
    });
  };

  const deleteTestimonial = (id: string) => {
    saveState({
      ...cmsData,
      agencyTestimonials: cmsData.agencyTestimonials.filter((t) => t.id !== id),
    });
  };

  // ── FAQs ───────────────────────────────────────────────────

  const addFAQ = (faq: AgencyFAQ) => {
    saveState({
      ...cmsData,
      agencyFaqs: [...cmsData.agencyFaqs, faq],
    });
  };

  const updateFAQ = (id: string, partial: Partial<AgencyFAQ>) => {
    saveState({
      ...cmsData,
      agencyFaqs: cmsData.agencyFaqs.map((f) => (f.id === id ? { ...f, ...partial } : f)),
    });
  };

  const deleteFAQ = (id: string) => {
    saveState({
      ...cmsData,
      agencyFaqs: cmsData.agencyFaqs.filter((f) => f.id !== id),
    });
  };

  // ── Home Sections ──────────────────────────────────────────

  const updateHomeSection = (id: string, partial: Partial<HomeSectionConfig>) => {
    saveState({
      ...cmsData,
      homeSections: cmsData.homeSections.map((sec) =>
        sec.id === id ? { ...sec, ...partial } : sec
      ),
    });
  };

  const reorderHomeSections = (sections: HomeSectionConfig[]) => {
    saveState({
      ...cmsData,
      homeSections: sections,
    });
  };

  // ── Team Members ───────────────────────────────────────────

  const addTeamMember = (member: TeamMember) => {
    saveState({
      ...cmsData,
      teamMembers: [...cmsData.teamMembers, member],
    });
  };

  const updateTeamMember = (id: string, partial: Partial<TeamMember>) => {
    saveState({
      ...cmsData,
      teamMembers: cmsData.teamMembers.map((m) =>
        m.id === id ? { ...m, ...partial } : m
      ),
    });
  };

  const deleteTeamMember = (id: string) => {
    saveState({
      ...cmsData,
      teamMembers: cmsData.teamMembers.filter((m) => m.id !== id),
    });
  };

  // ── Footer Orbit Images ───────────────────────────────────

  const updateFooterOrbitImages = (images: string[]) => {
    saveState({
      ...cmsData,
      footerOrbitImages: images,
    });
  };

  // ── Campaigns & Offer Ads ─────────────────────────────────

  const addCampaign = (campaign: CampaignOffer) => {
    saveState({
      ...cmsData,
      campaigns: [...(cmsData.campaigns || []), campaign],
    });
  };

  const updateCampaign = (id: string, partial: Partial<CampaignOffer>) => {
    saveState({
      ...cmsData,
      campaigns: (cmsData.campaigns || []).map((c) =>
        c.id === id ? { ...c, ...partial } : c
      ),
    });
  };

  const deleteCampaign = (id: string) => {
    saveState({
      ...cmsData,
      campaigns: (cmsData.campaigns || []).filter((c) => c.id !== id),
    });
  };

  const toggleCampaignActive = (id: string) => {
    saveState({
      ...cmsData,
      campaigns: (cmsData.campaigns || []).map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      ),
    });
  };

  // ── Affiliate & Referral Program ──────────────────────────

  const updateAffiliateConfig = (config: Partial<AffiliateProgramConfig>) => {
    saveState({
      ...cmsData,
      affiliateConfig: { ...cmsData.affiliateConfig!, ...config },
    });
  };

  const addAffiliatePartner = (partner: AffiliatePartner) => {
    saveState({
      ...cmsData,
      affiliatePartners: [partner, ...(cmsData.affiliatePartners || [])],
    });
  };

  const updateAffiliatePartner = (id: string, partial: Partial<AffiliatePartner>) => {
    saveState({
      ...cmsData,
      affiliatePartners: (cmsData.affiliatePartners || []).map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    });
  };

  const deleteAffiliatePartner = (id: string) => {
    saveState({
      ...cmsData,
      affiliatePartners: (cmsData.affiliatePartners || []).filter((p) => p.id !== id),
    });
  };

  const addAffiliateLead = (lead: AffiliateLead) => {
    saveState({
      ...cmsData,
      affiliateLeads: [lead, ...(cmsData.affiliateLeads || [])],
    });
  };

  const updateAffiliateLead = (id: string, partial: Partial<AffiliateLead>) => {
    saveState({
      ...cmsData,
      affiliateLeads: (cmsData.affiliateLeads || []).map((l) =>
        l.id === id ? { ...l, ...partial } : l
      ),
    });
  };

  const deleteAffiliateLead = (id: string) => {
    saveState({
      ...cmsData,
      affiliateLeads: (cmsData.affiliateLeads || []).filter((l) => l.id !== id),
    });
  };

  // ── System ─────────────────────────────────────────────────

  const resetToDefaults = () => {
    saveState(DEFAULT_CMS_DATA);
  };

  const exportDataJson = () => JSON.stringify(cmsData, null, 2);

  const importDataJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed === "object") {
        saveState(normalizeCmsData(parsed));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        isLoaded,
        isSyncing,
        cloudSyncInfo,
        refreshLiveContent,
        updateBanner,
        updateContactPage,
        updateGeneral,
        updateShowcaseItem,
        addShowcaseItem,
        deleteShowcaseItem,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addService,
        updateService,
        deleteService,
        reorderServices,
        saveServiceWithPackages,
        addPackage,
        updatePackage,
        deletePackage,
        getPackagesForService,
        getStartingPrice,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        updateHomeSection,
        reorderHomeSections,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        updateFooterOrbitImages,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        toggleCampaignActive,
        updateAffiliateConfig,
        addAffiliatePartner,
        updateAffiliatePartner,
        deleteAffiliatePartner,
        addAffiliateLead,
        updateAffiliateLead,
        deleteAffiliateLead,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used within a CmsProvider");
  return context;
}
