// ============================================================
// Qllix CMS Store v3 — Complete Data Layer
// ============================================================

// ─────────────────────────────────────────────────────────────
// LEGACY TYPES (used by Hero, BookingModal, etc.)
// ─────────────────────────────────────────────────────────────

export interface HeroBannerConfig {
  breadcrumb: string;
  line1Prefix: string;
  line1Accent: string;
  line2Prefix?: string;
  line2Accent?: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export interface ContactPageConfig {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  headingAccent: string;
  benefits: string[];
  imageUrl: string;
  serviceOptions: string[];
  budgetOptions: string[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  aspectRatio: number;
  video?: string;
}

export interface InquiryLead {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  whatsappCountryCode?: string;
  whatsappNumber?: string;
  service?: string;
  budget?: string;
  details?: string;
  status: "new" | "reviewing" | "contacted" | "closed";
}

export interface OfficeLocation {
  country: string;
  address: string;
  phone: string;
}

export interface SiteGeneralConfig {
  agencyName: string;
  tagline: string;
  logoUrl: string;
  footerLogoUrl?: string;
  faviconUrl?: string;
  contactEmail: string;
  adminPasscode: string;
  primaryColor?: string; // e.g. "#00FF87"
  secondaryColor?: string; // e.g. "#02180C"
  headingFont?: string; // e.g. "Outfit" | "Playfair Display" | "Syne" | "Inter"
  bodyFont?: string; // e.g. "Inter" | "Outfit"
  loadingBar?: {
    enabled: boolean;
    color: string;
    height: number;
  };
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    dribbble?: string;
    github?: string;
    facebook?: string;
    whatsapp?: string;
  };
  offices: OfficeLocation[];
}

export interface CampaignOffer {
  id: string;
  title: string;
  subtitle?: string;
  badge: string; // e.g. "SPECIAL OFFER" | "MEGA SALE" | "30% OFF"
  description: string;
  code?: string; // Promo coupon code e.g. "QLLIX25"
  discountPercent?: number; // Auto discount % applied on pricing e.g. 25
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  displayType: "announcement_bar" | "popup_modal" | "both";
  active: boolean;
  startDate?: string;
  endDate?: string;
  countdownDate?: string;
}

// ─────────────────────────────────────────────────────────────
// NEW DATA MODELS
// ─────────────────────────────────────────────────────────────

export type ServiceCategory =
  | "Graphic Design"
  | "Video & Motion"
  | "Branding"
  | "Digital Marketing"
  | "Social Media";

export interface AgencyService {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: string; // lucide-react icon name
  category: ServiceCategory;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  cardMockupLeft?: string;
  cardMockupCenter?: string;
  cardMockupRight?: string;
  cardPriceText?: string;
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name: string;
  price: number; // BDT
  discountPrice?: number;
  shortDesc: string;
  deliveryDays: number;
  revisions: number | string; // number or "Unlimited"
  features: string[];
  active: boolean;
  isPopular: boolean;
  displayOrder: number;
  ctaText: string;
  badge?: string;
  isMonthly?: boolean;
}

export type OrderStatus =
  | "new"
  | "confirmed"
  | "in_progress"
  | "waiting"
  | "revision"
  | "completed"
  | "cancelled";

export interface AgencyOrder {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  company?: string;
  serviceId: string;
  serviceName: string;
  packageId: string;
  packageName: string;
  amount: number;
  projectDetails: string;
  referenceUrl?: string;
  preferredDeadline?: string;
  status: OrderStatus;
  couponCode?: string;
  discountAmount?: number;
  originalAmount?: number;
}

export type PortfolioCategory =
  | "Branding"
  | "Logo"
  | "Social Media"
  | "Packaging"
  | "Motion"
  | "Video"
  | "Marketing";

export type ProjectBlockType = "text" | "image" | "video" | "gallery";

export interface ProjectContentBlock {
  id: string;
  type: ProjectBlockType;
  heading?: string;
  body?: string;
  imageUrl?: string;
  videoUrl?: string;
  galleryImages?: string[];
  caption?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  imageUrl: string;
  galleryImages?: string[];
  videoUrl?: string;
  projectUrl?: string;
  client?: string;
  deliverables?: string[];
  active: boolean;
  displayOrder: number;
  /** Ordered content for the public project case-study page. */
  contentBlocks?: ProjectContentBlock[];
}

export interface AgencyTestimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  avatar: string;
  rating: number;
  text: string;
  active: boolean;
  displayOrder: number;
}

export interface AgencyFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  active: boolean;
  displayOrder: number;
}

export interface HomeSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  displayOrder: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  imageUrl: string;
  active: boolean;
  displayOrder: number;
  email?: string;
  linkedin?: string;
  bio?: string;
}

export interface AffiliateProgramConfig {
  enabled: boolean;
  minProjectAmount: number; // e.g. 20000
  commissionPercent: number; // e.g. 20
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
  payoutTerms: string;
}

export interface AffiliatePartner {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  payoutMethod: "bkash" | "nagad" | "rocket" | "bank";
  payoutNumber: string;
  referralCode: string;
  profession?: string;
  status: "active" | "pending" | "paused";
  createdAt: string;
}

export interface AffiliateLead {
  id: string;
  referrerName: string;
  referrerPhone: string;
  referrerCode?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceCategory: string;
  projectBudget: number;
  commissionEarned: number;
  projectDetails: string;
  status: "new" | "contacted" | "deal_closed" | "commission_paid" | "rejected";
  payoutTrxId?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────
// CMS DATA ROOT
// ─────────────────────────────────────────────────────────────

export interface CmsData {
  _lastModified?: number;
  general: SiteGeneralConfig;
  banners: {
    home: HeroBannerConfig;
    projects: HeroBannerConfig;
    services: HeroBannerConfig;
    pricing: HeroBannerConfig;
    contact: HeroBannerConfig;
    about: HeroBannerConfig;
    team: HeroBannerConfig;
  };
  contactPage: ContactPageConfig;
  showcase: {
    row1: ShowcaseItem[];
    row2: ShowcaseItem[];
  };
  inquiries: InquiryLead[];
  // NEW
  agencyServices: AgencyService[];
  packages: ServicePackage[];
  orders: AgencyOrder[];
  portfolioItems: PortfolioItem[];
  agencyTestimonials: AgencyTestimonial[];
  agencyFaqs: AgencyFAQ[];
  homeSections: HomeSectionConfig[];
  teamMembers: TeamMember[];
  footerOrbitImages: string[];
  campaigns: CampaignOffer[];
  affiliateConfig?: AffiliateProgramConfig;
  affiliatePartners?: AffiliatePartner[];
  affiliateLeads?: AffiliateLead[];
}

// ─────────────────────────────────────────────────────────────
// DEFAULT DATA — 11 SERVICES
// ─────────────────────────────────────────────────────────────

export const DEFAULT_AGENCY_SERVICES: AgencyService[] = [
  {
    id: "logo-design",
    name: "Logo Design",
    shortDesc: "Custom visual identities that make your brand instantly recognizable and memorable.",
    longDesc: "We craft unique, versatile logo systems tailored to your brand's personality. From concept to final delivery, every logo is designed with strategic intent — ensuring it works flawlessly across digital, print, and social media.",
    icon: "Sparkles",
    category: "Graphic Design",
    active: true,
    featured: true,
    displayOrder: 1,
  },
  {
    id: "social-media-design",
    name: "Social Media Design",
    shortDesc: "Scroll-stopping creatives that build brand consistency across all platforms.",
    longDesc: "From Instagram posts to Facebook covers, we design eye-catching social media graphics that reflect your brand identity and drive engagement. Every design is optimized for platform dimensions and visual impact.",
    icon: "Share2",
    category: "Social Media",
    active: true,
    featured: true,
    displayOrder: 2,
  },
  {
    id: "packaging-label-design",
    name: "Packaging & Label Design",
    shortDesc: "Premium packaging designs that stand out on shelves and tell your brand story.",
    longDesc: "Great packaging is your silent salesperson. We design print-ready packaging and labels that command attention, communicate brand values, and convert browsers into buyers — perfectly suited for e-commerce and retail.",
    icon: "Package",
    category: "Graphic Design",
    active: true,
    featured: false,
    displayOrder: 3,
  },
  {
    id: "reels-editing",
    name: "Reels Editing",
    shortDesc: "High-energy short-form video edits optimized for Instagram & Facebook Reels.",
    longDesc: "We transform your raw footage into polished, engaging Reels with professional cuts, transitions, captions, and music. Our edits are designed to hook viewers in the first 3 seconds and maximize reach and shares.",
    icon: "Film",
    category: "Video & Motion",
    active: true,
    featured: true,
    displayOrder: 4,
  },
  {
    id: "logo-animation",
    name: "Logo Animation",
    shortDesc: "Bring your logo to life with smooth, professional motion graphics.",
    longDesc: "A well-animated logo elevates your brand's perceived value instantly. We create stunning logo intros and stings for YouTube, social media, presentations, and broadcast — delivered in all required formats.",
    icon: "Clapperboard",
    category: "Video & Motion",
    active: true,
    featured: false,
    displayOrder: 5,
  },
  {
    id: "full-brand-design",
    name: "Full Brand Design",
    shortDesc: "Complete brand identity systems — from logo to full visual guidelines.",
    longDesc: "A complete branding package covering logo design, color palette, typography, brand guidelines, business cards, letterhead, social media templates, and everything you need to launch a cohesive, professional brand.",
    icon: "Palette",
    category: "Branding",
    active: true,
    featured: true,
    displayOrder: 6,
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    shortDesc: "Data-driven digital marketing campaigns that generate real, measurable results.",
    longDesc: "From Facebook and Instagram ads to Google Ads and SEO, we run performance-focused digital marketing campaigns. We handle strategy, creative, targeting, and optimization — delivering maximum ROI on your ad spend.",
    icon: "TrendingUp",
    category: "Digital Marketing",
    active: true,
    featured: false,
    displayOrder: 7,
  },
  {
    id: "social-media-page-setup",
    name: "Social Media Page Setup",
    shortDesc: "Professional setup and optimization of your social media business pages.",
    longDesc: "We fully set up and optimize your Facebook, Instagram, YouTube, and LinkedIn business pages — including profile design, cover art, bio writing, category setup, and initial content strategy to make a strong first impression.",
    icon: "Globe",
    category: "Social Media",
    active: true,
    featured: false,
    displayOrder: 8,
  },
  {
    id: "political-poster-banner",
    name: "Political Poster & Banner Design",
    shortDesc: "Impactful political campaign materials designed for maximum visual appeal.",
    longDesc: "We design powerful political posters, banners, flex prints, and digital campaign materials. Our designs combine strong imagery, clear messaging, and patriotic aesthetics to build candidate recognition and voter trust.",
    icon: "Flag",
    category: "Graphic Design",
    active: true,
    featured: false,
    displayOrder: 9,
  },
  {
    id: "monthly-social-creative",
    name: "Monthly Social Media Creative",
    shortDesc: "Consistent monthly social media design — fresh creatives delivered every month.",
    longDesc: "Never run out of content again. Our monthly creative subscription delivers fresh, on-brand social media posts, stories, and reels graphics every month. You focus on your business; we handle your visual presence.",
    icon: "Calendar",
    category: "Social Media",
    active: true,
    featured: true,
    displayOrder: 10,
  },
  {
    id: "youtube-video-editing",
    name: "YouTube Video Editing",
    shortDesc: "Professional YouTube video editing that keeps viewers watching till the end.",
    longDesc: "We edit your raw YouTube footage into polished, engaging videos with professional color grading, motion graphics, captions, thumbnails, and platform-optimized cuts. Designed to grow your channel and retain subscribers.",
    icon: "PlayCircle",
    category: "Video & Motion",
    active: true,
    featured: false,
    displayOrder: 11,
  },
  {
    id: "company-profile-catalogue",
    name: "Company Profile & Catalogue",
    shortDesc: "Corporate company profiles, product catalogues, and brochures tailored for business growth.",
    longDesc: "Elevate your corporate identity with masterfully designed company profiles, product catalogues, and commercial brochures. We craft high-resolution print-ready layouts, interactive digital PDFs with clickable links, and modern corporate storytelling visuals that impress investors, clients, and partners.",
    icon: "BookOpen",
    category: "Graphic Design",
    active: true,
    featured: true,
    displayOrder: 12,
  },
  {
    id: "stand-banner-x-banner",
    name: "Stand Banner & X-Banner",
    shortDesc: "Striking roll-up banners, X-banners, and event display stands that captivate audiences.",
    longDesc: "Make a bold statement at exhibitions, trade shows, business conferences, retail shops, and corporate events. We create high-resolution, vibrant roll-up pull-up banners, X-frame banners, and backdrop displays with high-contrast messaging designed to capture attention from afar.",
    icon: "Layers",
    category: "Graphic Design",
    active: true,
    featured: false,
    displayOrder: 13,
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT PACKAGES (3 per service × 11 services = 33 packages)
// ─────────────────────────────────────────────────────────────

export const DEFAULT_PACKAGES: ServicePackage[] = [
  // ── LOGO DESIGN ──────────────────────────────────────────
  {
    id: "pkg-logo-basic",
    serviceId: "logo-design",
    name: "Basic",
    price: 1500,
    shortDesc: "Perfect for startups and small businesses needing a clean, professional logo.",
    deliveryDays: 7,
    revisions: 3,
    features: [
      "2 Unique Logo Concepts",
      "3 Revisions Included",
      "PNG & JPG Formats",
      "Transparent Background PNG",
      "7 Days Delivery",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
    isMonthly: false,
  },
  {
    id: "pkg-logo-business",
    serviceId: "logo-design",
    name: "Business",
    price: 3500,
    shortDesc: "Comprehensive logo package with source files and brand color guidance.",
    deliveryDays: 5,
    revisions: 5,
    features: [
      "4 Unique Logo Concepts",
      "5 Revisions Included",
      "PNG / JPG / SVG Formats",
      "Vector Source Files (AI/EPS)",
      "Brand Color Palette",
      "Transparent Background",
      "5 Days Delivery",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
    isMonthly: false,
  },
  {
    id: "pkg-logo-premium",
    serviceId: "logo-design",
    name: "Premium",
    price: 6000,
    shortDesc: "Full-scale logo system with brand guidelines, mockups, and social media kit.",
    deliveryDays: 3,
    revisions: "Unlimited",
    features: [
      "6 Unique Logo Concepts",
      "Unlimited Revisions",
      "All File Formats (AI/EPS/SVG/PDF/PNG/JPG)",
      "Brand Color & Typography Guide",
      "Mockup Presentation (5 scenes)",
      "Social Media Profile Kit",
      "Print-Ready Files",
      "3 Days Express Delivery",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
    isMonthly: false,
  },

  // ── SOCIAL MEDIA DESIGN ────────────────────────────────────
  {
    id: "pkg-smd-basic",
    serviceId: "social-media-design",
    name: "Basic",
    price: 3000,
    shortDesc: "Essential social media posts to maintain an active brand presence.",
    deliveryDays: 7,
    revisions: 2,
    features: [
      "10 Static Posts/Month",
      "2 Platforms (FB + IG)",
      "2 Revisions per Post",
      "Brand Colors Applied",
      "PNG Delivery",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
    isMonthly: true,
  },
  {
    id: "pkg-smd-business",
    serviceId: "social-media-design",
    name: "Business",
    price: 6000,
    shortDesc: "Regular content with stories and branded templates for growing brands.",
    deliveryDays: 5,
    revisions: 3,
    features: [
      "20 Static Posts/Month",
      "10 Story Designs",
      "3 Platforms (FB + IG + YouTube Cover)",
      "3 Revisions per Design",
      "Branded Templates",
      "PNG + PSD Source Files",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
    isMonthly: true,
  },
  {
    id: "pkg-smd-premium",
    serviceId: "social-media-design",
    name: "Premium",
    price: 10000,
    shortDesc: "Full social media visual management with unlimited designs.",
    deliveryDays: 3,
    revisions: "Unlimited",
    features: [
      "Unlimited Static Posts",
      "20 Story Designs",
      "5 Reel Thumbnails",
      "All Platforms Covered",
      "Unlimited Revisions",
      "All Source Files Included",
      "Monthly Strategy Call",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
    isMonthly: true,
  },

  // ── PACKAGING & LABEL DESIGN ──────────────────────────────
  {
    id: "pkg-pkg-basic",
    serviceId: "packaging-label-design",
    name: "Basic",
    price: 2500,
    shortDesc: "Single-side packaging or label design for startups.",
    deliveryDays: 7,
    revisions: 3,
    features: [
      "1 Packaging/Label Design",
      "Single Side Design",
      "3 Revisions",
      "Print-Ready PDF",
      "PNG Preview",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-pkg-business",
    serviceId: "packaging-label-design",
    name: "Business",
    price: 5000,
    shortDesc: "Complete packaging with all sides and dieline template.",
    deliveryDays: 5,
    revisions: 5,
    features: [
      "1 Full Packaging Design (All Sides)",
      "Dieline/Template Included",
      "5 Revisions",
      "Print-Ready PDF & AI Files",
      "3D Mockup Preview",
      "Brand Color Matching",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-pkg-premium",
    serviceId: "packaging-label-design",
    name: "Premium",
    price: 9000,
    shortDesc: "Premium packaging suite with mockups and multiple variations.",
    deliveryDays: 4,
    revisions: "Unlimited",
    features: [
      "Up to 3 Packaging Variants",
      "All Sides + Dieline",
      "Unlimited Revisions",
      "High-Res 3D Mockups (5 scenes)",
      "Print-Ready Files (PDF/AI/EPS)",
      "Social Media Ready Mockups",
      "Pantone Color Guidance",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── REELS EDITING ─────────────────────────────────────────
  {
    id: "pkg-reels-basic",
    serviceId: "reels-editing",
    name: "Basic",
    price: 2000,
    shortDesc: "Clean, fast reel with cuts and background music.",
    deliveryDays: 3,
    revisions: 2,
    features: [
      "Up to 60 Sec Reel",
      "Basic Cuts & Transitions",
      "Background Music",
      "Subtitles/Captions",
      "2 Revisions",
      "1080p HD Delivery",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-reels-business",
    serviceId: "reels-editing",
    name: "Business",
    price: 4000,
    shortDesc: "Professional reel with motion graphics and branding elements.",
    deliveryDays: 2,
    revisions: 3,
    features: [
      "Up to 90 Sec Reel",
      "Advanced Transitions",
      "Motion Graphics & Text Animations",
      "Brand Logo Watermark",
      "Captions & Subtitles",
      "3 Revisions",
      "1080p HD + Vertical Format",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-reels-premium",
    serviceId: "reels-editing",
    name: "Premium",
    price: 7500,
    shortDesc: "Cinematic reel with color grading, SFX, and premium motion design.",
    deliveryDays: 3,
    revisions: "Unlimited",
    features: [
      "Up to 3 Min Reel",
      "Professional Color Grading",
      "Premium Motion Graphics",
      "Sound Effects & Music Sync",
      "Brand Intro/Outro",
      "Unlimited Revisions",
      "4K & Multiple Format Delivery",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── LOGO ANIMATION ─────────────────────────────────────────
  {
    id: "pkg-lanim-basic",
    serviceId: "logo-animation",
    name: "Basic",
    price: 2500,
    shortDesc: "Simple, clean logo reveal animation for intros.",
    deliveryDays: 5,
    revisions: 2,
    features: [
      "5–10 Sec Logo Animation",
      "Simple Reveal Effect",
      "Transparent Background (MOV/WEBM)",
      "MP4 Delivery",
      "2 Revisions",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-lanim-business",
    serviceId: "logo-animation",
    name: "Business",
    price: 5000,
    shortDesc: "Professional logo sting with sound effects and custom motion.",
    deliveryDays: 4,
    revisions: 3,
    features: [
      "10–15 Sec Logo Animation",
      "Custom Motion Design",
      "Sound Effects Included",
      "Transparent BG (MOV/WEBM)",
      "MP4 + GIF Delivery",
      "3 Revisions",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-lanim-premium",
    serviceId: "logo-animation",
    name: "Premium",
    price: 9000,
    shortDesc: "Cinematic brand ident with 3D elements and premium audio.",
    deliveryDays: 5,
    revisions: "Unlimited",
    features: [
      "15–30 Sec Brand Ident",
      "3D/Advanced Motion Effects",
      "Premium Sound Design",
      "Multiple Variations (Short/Long)",
      "All Formats Included",
      "Unlimited Revisions",
      "4K Resolution",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── FULL BRAND DESIGN ─────────────────────────────────────
  {
    id: "pkg-brand-basic",
    serviceId: "full-brand-design",
    name: "Basic",
    price: 8000,
    shortDesc: "Essential brand kit — logo, colors, typography, and basic guidelines.",
    deliveryDays: 10,
    revisions: 3,
    features: [
      "Primary Logo Design",
      "Brand Color Palette",
      "Typography Selection",
      "Basic Brand Guidelines (10 pages)",
      "Business Card Design",
      "All Source Files",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-brand-business",
    serviceId: "full-brand-design",
    name: "Business",
    price: 18000,
    shortDesc: "Complete brand identity system for growing businesses.",
    deliveryDays: 14,
    revisions: 5,
    features: [
      "Full Logo System (Primary + Variations)",
      "Complete Color System",
      "Typography Hierarchy",
      "30-Page Brand Guidelines",
      "Business Card + Letterhead",
      "Social Media Profile Kit",
      "Email Signature Design",
      "5 Social Media Templates",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-brand-premium",
    serviceId: "full-brand-design",
    name: "Premium",
    price: 35000,
    shortDesc: "Enterprise brand ecosystem with motion, packaging, and full collateral.",
    deliveryDays: 21,
    revisions: "Unlimited",
    features: [
      "Full Logo System + Animations",
      "Complete Brand Architecture",
      "50+ Page Brand Guidelines",
      "Full Stationery Suite",
      "Social Media Kit (20 templates)",
      "Packaging Design (1 product)",
      "Brand Pattern & Textures",
      "Pitch Deck Template",
      "Unlimited Revisions",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── DIGITAL MARKETING ──────────────────────────────────────
  {
    id: "pkg-dm-basic",
    serviceId: "digital-marketing",
    name: "Basic",
    price: 8000,
    shortDesc: "Starter digital marketing management for small businesses.",
    deliveryDays: 30,
    revisions: 0,
    features: [
      "1 Platform (FB or Google)",
      "Ad Account Setup & Pixel",
      "2 Ad Campaigns/Month",
      "4 Ad Creatives/Month",
      "Monthly Performance Report",
      "Basic Audience Research",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Get Started",
    isMonthly: true,
  },
  {
    id: "pkg-dm-business",
    serviceId: "digital-marketing",
    name: "Business",
    price: 15000,
    shortDesc: "Multi-platform campaigns with creative, targeting, and optimization.",
    deliveryDays: 30,
    revisions: 0,
    features: [
      "2 Platforms (FB + Google)",
      "5 Ad Campaigns/Month",
      "10 Ad Creatives/Month",
      "Audience Segmentation",
      "A/B Testing",
      "Bi-Weekly Reports",
      "Retargeting Setup",
      "Landing Page Optimization",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Get Started",
    badge: "Most Popular",
    isMonthly: true,
  },
  {
    id: "pkg-dm-premium",
    serviceId: "digital-marketing",
    name: "Premium",
    price: 25000,
    shortDesc: "Full-funnel omnichannel marketing with dedicated account management.",
    deliveryDays: 30,
    revisions: 0,
    features: [
      "FB + Google + YouTube + TikTok",
      "Unlimited Campaigns",
      "20+ Ad Creatives/Month",
      "Advanced Funnel Strategy",
      "Weekly Performance Sync",
      "CRO & Landing Page Management",
      "Email Marketing Integration",
      "Dedicated Account Manager",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Get Started",
    isMonthly: true,
  },

  // ── SOCIAL MEDIA PAGE SETUP ───────────────────────────────
  {
    id: "pkg-smps-basic",
    serviceId: "social-media-page-setup",
    name: "Basic",
    price: 3000,
    shortDesc: "Professional setup of 1–2 social media business pages.",
    deliveryDays: 3,
    revisions: 2,
    features: [
      "2 Platforms Setup (FB + IG)",
      "Profile Photo Design",
      "Cover Photo Design",
      "Bio & Description Writing",
      "Category & Info Setup",
      "2 Revisions",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-smps-business",
    serviceId: "social-media-page-setup",
    name: "Business",
    price: 6000,
    shortDesc: "Complete multi-platform setup with branded templates.",
    deliveryDays: 4,
    revisions: 3,
    features: [
      "4 Platforms (FB + IG + YT + LinkedIn)",
      "Profile & Cover Design (All Platforms)",
      "Professional Bio Writing",
      "Page Category & CTA Setup",
      "3 Starter Post Templates",
      "Highlight Cover Icons (IG)",
      "3 Revisions",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-smps-premium",
    serviceId: "social-media-page-setup",
    name: "Premium",
    price: 10000,
    shortDesc: "Full brand-consistent setup across all major platforms.",
    deliveryDays: 5,
    revisions: "Unlimited",
    features: [
      "All Major Platforms",
      "Complete Branded Design Kit",
      "SEO-Optimized Bios",
      "Pinned Post Strategy",
      "10 Branded Starter Posts",
      "Highlight Covers (20 icons)",
      "Facebook Shop/Instagram Shop Setup",
      "Unlimited Revisions",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── POLITICAL POSTER & BANNER ─────────────────────────────
  {
    id: "pkg-ppb-basic",
    serviceId: "political-poster-banner",
    name: "Basic",
    price: 1500,
    shortDesc: "Eye-catching political poster for digital and print use.",
    deliveryDays: 2,
    revisions: 2,
    features: [
      "1 Poster Design",
      "Digital & Print Sizes",
      "2 Revisions",
      "PNG + PDF Delivery",
      "High Resolution",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-ppb-business",
    serviceId: "political-poster-banner",
    name: "Business",
    price: 3500,
    shortDesc: "Campaign materials package — posters, banners, and social graphics.",
    deliveryDays: 3,
    revisions: 4,
    features: [
      "3 Poster Designs (Variants)",
      "1 Flex Banner Design",
      "Social Media Version",
      "4 Revisions",
      "Print-Ready Files",
      "Multiple Size Exports",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-ppb-premium",
    serviceId: "political-poster-banner",
    name: "Premium",
    price: 7000,
    shortDesc: "Full campaign design kit for serious political campaigns.",
    deliveryDays: 4,
    revisions: "Unlimited",
    features: [
      "5 Poster Designs",
      "3 Banner/Flex Designs",
      "Digital Campaign Graphics (10 pieces)",
      "Vehicle/Rickshaw Sticker Design",
      "Social Media Kit",
      "Unlimited Revisions",
      "All Print-Ready Files",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── MONTHLY SOCIAL CREATIVE ───────────────────────────────
  {
    id: "pkg-msc-basic",
    serviceId: "monthly-social-creative",
    name: "Basic",
    price: 5000,
    shortDesc: "Consistent monthly social media design to maintain your online presence.",
    deliveryDays: 30,
    revisions: 2,
    features: [
      "15 Static Posts/Month",
      "2 Platforms (FB + IG)",
      "Branded Templates",
      "2 Revisions per Design",
      "Monthly Delivery Schedule",
      "PNG Formats",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Subscribe Basic",
    isMonthly: true,
  },
  {
    id: "pkg-msc-business",
    serviceId: "monthly-social-creative",
    name: "Business",
    price: 10000,
    shortDesc: "Regular high-quality content with stories and video thumbnails.",
    deliveryDays: 30,
    revisions: 3,
    features: [
      "30 Static Posts/Month",
      "20 Story Designs/Month",
      "3 Platforms Covered",
      "3 Revisions per Design",
      "Reel Thumbnails (5/month)",
      "Brand Consistency Maintained",
      "Source Files Included",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Subscribe Business",
    badge: "Most Popular",
    isMonthly: true,
  },
  {
    id: "pkg-msc-premium",
    serviceId: "monthly-social-creative",
    name: "Premium",
    price: 18000,
    shortDesc: "Full-scale monthly social media creative management.",
    deliveryDays: 30,
    revisions: "Unlimited",
    features: [
      "Unlimited Static Posts",
      "30 Story Designs/Month",
      "10 Reel Cover Designs",
      "All Platforms",
      "Unlimited Revisions",
      "All Source Files",
      "Monthly Strategy Session",
      "Priority 24hr Turnaround",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Subscribe Premium",
    isMonthly: true,
  },

  // ── YOUTUBE VIDEO EDITING ─────────────────────────────────
  {
    id: "pkg-yt-basic",
    serviceId: "youtube-video-editing",
    name: "Basic",
    price: 3000,
    shortDesc: "Clean, professional YouTube video editing up to 15 minutes.",
    deliveryDays: 4,
    revisions: 2,
    features: [
      "Up to 15 Min Video",
      "Basic Cuts & Transitions",
      "Lower Thirds",
      "Background Music",
      "Subtitles/Captions",
      "2 Revisions",
      "1080p HD Export",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Basic",
  },
  {
    id: "pkg-yt-business",
    serviceId: "youtube-video-editing",
    name: "Business",
    price: 6000,
    shortDesc: "Full YouTube video with motion graphics, thumbnail, and SEO optimization.",
    deliveryDays: 3,
    revisions: 3,
    features: [
      "Up to 30 Min Video",
      "Motion Graphics & Animations",
      "Custom Thumbnail Design",
      "End Screen & Cards Setup",
      "Color Grading",
      "Intro/Outro Animation",
      "3 Revisions",
      "1080p HD + Audio Enhancement",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Business",
    badge: "Most Popular",
  },
  {
    id: "pkg-yt-premium",
    serviceId: "youtube-video-editing",
    name: "Premium",
    price: 12000,
    shortDesc: "Cinematic YouTube production with full branding and 4K delivery.",
    deliveryDays: 4,
    revisions: "Unlimited",
    features: [
      "Unlimited Duration",
      "Cinematic Color Grading",
      "Advanced Motion Graphics",
      "Professional Sound Design",
      "Custom Animated Intro/Outro",
      "3 Thumbnail Designs",
      "Shorts/Reels Cut Included",
      "Unlimited Revisions",
      "4K Export",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Premium",
  },

  // ── COMPANY PROFILE & CATALOGUE ───────────────────────────
  {
    id: "pkg-cpc-basic",
    serviceId: "company-profile-catalogue",
    name: "Starter Profile",
    price: 3500,
    shortDesc: "Essential 4–8 page corporate company profile for startups and growing businesses.",
    deliveryDays: 4,
    revisions: 3,
    features: [
      "Up to 8 Custom Pages",
      "Modern Corporate Layout",
      "Print-Ready PDF (CMYK + Bleed)",
      "Interactive Web-Optimized PDF",
      "Stock Photography Sourcing",
      "3 Revision Rounds",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Starter",
  },
  {
    id: "pkg-cpc-business",
    serviceId: "company-profile-catalogue",
    name: "Corporate & Catalogue",
    price: 7000,
    shortDesc: "Complete 12–16 page profile or product catalogue with custom infographics.",
    deliveryDays: 6,
    revisions: 5,
    features: [
      "Up to 16 Custom Pages",
      "Bespoke Infographics & Charts",
      "Full Product / Service Showcase",
      "Interactive PDF with Clickable Links",
      "Commercial Print-Ready Files",
      "5 Revision Rounds",
      "Editable Source Files (AI / InDesign)",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Corporate",
    badge: "Most Popular",
  },
  {
    id: "pkg-cpc-premium",
    serviceId: "company-profile-catalogue",
    name: "Enterprise Publication",
    price: 14000,
    shortDesc: "Luxury 20–32+ page editorial design for comprehensive product lines & enterprise brands.",
    deliveryDays: 10,
    revisions: "Unlimited",
    features: [
      "Up to 32 Custom Pages",
      "Luxury Editorial Design System",
      "Product Cataloguing & Grid Systems",
      "Custom Icons & Data Visualizations",
      "Interactive PDF + Digital Flipbook",
      "Unlimited Revisions",
      "Full Source Files & Print Production Specs",
      "Dedicated Senior Art Director",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Enterprise",
  },

  // ── STAND BANNER & X-BANNER ────────────────────────────────
  {
    id: "pkg-sbxb-basic",
    serviceId: "stand-banner-x-banner",
    name: "Single Display",
    price: 1200,
    shortDesc: "1 custom roll-up stand banner or X-banner in standard display dimensions.",
    deliveryDays: 2,
    revisions: 3,
    features: [
      "1 Custom Banner Design",
      "Roll-up (33x80\") or X-Banner (24x60\")",
      "300 DPI High-Res Print-Ready",
      "CMYK Color Mode with Print Bleed",
      "Realistic 3D Mockup Preview",
      "3 Revision Rounds",
    ],
    active: true,
    isPopular: false,
    displayOrder: 1,
    ctaText: "Order Single",
  },
  {
    id: "pkg-sbxb-business",
    serviceId: "stand-banner-x-banner",
    name: "Event Duo Pack",
    price: 2200,
    shortDesc: "2 coordinated display banners for trade shows, events, and retail entrances.",
    deliveryDays: 3,
    revisions: 5,
    features: [
      "2 Custom Banner Designs",
      "Flexible Sizes (Roll-up, X-stand, Backdrop)",
      "Unified Event Branding Theme",
      "High-Resolution Print PDF + TIFF",
      "Realistic 3D Event Mockups",
      "5 Revision Rounds",
      "Editable Source Files (AI / PSD)",
    ],
    active: true,
    isPopular: true,
    displayOrder: 2,
    ctaText: "Order Duo Pack",
    badge: "Most Popular",
  },
  {
    id: "pkg-sbxb-premium",
    serviceId: "stand-banner-x-banner",
    name: "Exhibition Suite",
    price: 4000,
    shortDesc: "Complete exhibition booth and retail display setup with up to 4 banner designs.",
    deliveryDays: 4,
    revisions: "Unlimited",
    features: [
      "Up to 4 Display Banners",
      "Roll-up, X-Stand & Backdrop Formats",
      "Cohesive Visual Brand Harmony",
      "Ultra-Sharp Vector Graphics",
      "Unlimited Revisions",
      "Full Source Files (AI, EPS, PSD, PDF)",
      "Direct Commercial Print Production Guidance",
    ],
    active: true,
    isPopular: false,
    displayOrder: 3,
    ctaText: "Order Exhibition Suite",
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT PORTFOLIO ITEMS
// ─────────────────────────────────────────────────────────────

export const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "pf-01",
    title: "Zafran Foods — Brand Identity",
    category: "Branding",
    description: "Complete brand identity for a premium Bangladeshi food brand, including logo system, packaging, and brand guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r1_04_gridline.png",
      "/images/showcase/card_r1_07_coffee.png",
      "/images/showcase/card_r2_06_zinggo.png",
    ],
    projectUrl: "https://www.behance.net",
    client: "Zafran Foods Ltd.",
    deliverables: ["Logo Suite", "Packaging", "Brand Guidelines", "Social Kit"],
    active: true,
    displayOrder: 1,
  },
  {
    id: "pf-02",
    title: "TechNova BD — Logo Design",
    category: "Logo",
    description: "Modern, versatile logo design for a Dhaka-based tech startup with complete source files and usage guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r2_02_yantrik.png",
      "/images/showcase/card_r2_03_golf.png",
    ],
    projectUrl: "https://dribbble.com",
    client: "TechNova BD Solutions",
    deliverables: ["Vector Logo", "Typography Guide", "Source Files"],
    active: true,
    displayOrder: 2,
  },
  {
    id: "pf-03",
    title: "StyleBD — Social Media Campaign",
    category: "Social Media",
    description: "Monthly social media creatives for a fashion brand across Instagram and Facebook, driving 300% engagement growth.",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r1_05_ter.png",
      "/images/showcase/card_r1_01_fitmate.png",
    ],
    projectUrl: "https://www.facebook.com/Qllix/",
    client: "StyleBD Apparel",
    deliverables: ["Static Banners", "Carousel Ads", "Story Templates"],
    active: true,
    displayOrder: 3,
  },
  {
    id: "pf-04",
    title: "Nurish Herbal — Packaging Design",
    category: "Packaging",
    description: "Premium herbal product packaging with label design, box artwork, and 3D mockup presentations for retail launch.",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r2_06_zinggo.png",
      "/images/showcase/card_r1_03_gummiz.png",
    ],
    projectUrl: "https://www.behance.net",
    client: "Nurish Herbal Care",
    deliverables: ["3D Box Design", "Bottle Labels", "Print Dieline"],
    active: true,
    displayOrder: 4,
  },
  {
    id: "pf-05",
    title: "Apex Corp — Logo Animation",
    category: "Motion",
    description: "Dynamic logo reveal animation with professional sound design for a corporate brand's digital presence.",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869ad10e2ef?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1536240478700-b869ad10e2ef?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r2_04_alpine.png",
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    projectUrl: "https://www.youtube.com",
    client: "Apex Global Group",
    deliverables: ["4K Logo Intro", "Sound FX Integration", "Transparent WebM"],
    active: true,
    displayOrder: 5,
  },
  {
    id: "pf-06",
    title: "ProTech BD — YouTube Channel",
    category: "Video",
    description: "Monthly YouTube video editing for a tech review channel, growing from 5K to 50K subscribers in 6 months.",
    imageUrl: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r2_05_venex.png",
      "/images/showcase/card_r2_01_tablet.png",
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    projectUrl: "https://www.youtube.com",
    client: "ProTech Media",
    deliverables: ["1080p60 Video Edits", "Dynamic Captions", "Clickable Thumbnails"],
    active: true,
    displayOrder: 6,
  },
  {
    id: "pf-07",
    title: "GreenLeaf Organics — FB Ads",
    category: "Marketing",
    description: "Facebook and Instagram ad campaigns for an organic food brand achieving 4.2x ROAS within 3 months.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r1_02_affine.png",
    ],
    projectUrl: "https://www.facebook.com/Qllix/",
    client: "GreenLeaf Organics",
    deliverables: ["Conversion Ads", "Targeting Setup", "Performance Analytics"],
    active: true,
    displayOrder: 7,
  },
  {
    id: "pf-08",
    title: "Shefa Healthcare — Brand System",
    category: "Branding",
    description: "Full brand identity system for a healthcare clinic, establishing trust through clean, professional visual language.",
    imageUrl: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=1200&q=80",
      "/images/showcase/card_r1_06_leather.png",
      "/images/showcase/card_r2_02_yantrik.png",
    ],
    projectUrl: "https://www.behance.net",
    client: "Shefa Care Hospital",
    deliverables: ["Medical Iconography", "Signage Dielines", "Brand Book"],
    active: true,
    displayOrder: 8,
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT TESTIMONIALS
// ─────────────────────────────────────────────────────────────

export const DEFAULT_TESTIMONIALS: AgencyTestimonial[] = [
  {
    id: "tm-01",
    clientName: "Rafiqul Islam",
    company: "TechNova BD",
    position: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Qllix delivered an exceptional logo and brand identity for TechNova. Their creativity and attention to detail are unmatched. The final result exceeded our expectations — we now get compliments on our brand every single day.",
    active: true,
    displayOrder: 1,
  },
  {
    id: "tm-02",
    clientName: "Nasrin Akter",
    company: "Nurish Herbal",
    position: "Managing Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "We hired Qllix for our packaging design and the result was absolutely stunning. Our products now look premium on shelves and our retail sales increased by 60% within the first month of relaunch. Highly recommend!",
    active: true,
    displayOrder: 2,
  },
  {
    id: "tm-03",
    clientName: "Tanvir Ahmed",
    company: "ProTech YouTube",
    position: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Qllix has been editing my YouTube videos for 6 months. The quality is consistently professional and they always deliver on time. My channel grew from 5K to 50K subscribers thanks to their premium editing and thumbnails.",
    active: true,
    displayOrder: 3,
  },
  {
    id: "tm-04",
    clientName: "Sumaiya Khatun",
    company: "StyleBD Fashion",
    position: "Brand Manager",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The monthly social media package from Qllix transformed our Instagram presence. Our engagement rate went from 1% to 7% and we now get daily DMs from customers who found us through their stunning creatives. Worth every taka!",
    active: true,
    displayOrder: 4,
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT FAQ
// ─────────────────────────────────────────────────────────────

export const DEFAULT_FAQS: AgencyFAQ[] = [
  {
    id: "faq-01",
    question: "How do I order a package?",
    answer: "Simply click the 'Order Now' button on any package card. Fill in your details, select your service and package, and submit the form. Our team will contact you within 2 hours to confirm your order and get started.",
    category: "Getting Started",
    active: true,
    displayOrder: 1,
  },
  {
    id: "faq-02",
    question: "How many revisions are included?",
    answer: "Revisions vary by package — Basic packages include 2–3 revisions, Business packages include 4–5 revisions, and Premium packages include unlimited revisions. All revision counts are clearly listed on each package card.",
    category: "Process",
    active: true,
    displayOrder: 2,
  },
  {
    id: "faq-03",
    question: "Will I receive source files?",
    answer: "Yes! Business and Premium packages include full source files (AI, EPS, PSD, etc.). Basic packages typically include final output files (PNG, JPG, PDF). Source file details are listed in each package's feature list.",
    category: "Deliverables",
    active: true,
    displayOrder: 3,
  },
  {
    id: "faq-04",
    question: "How long does delivery take?",
    answer: "Delivery time varies by service and package. Logo designs take 3–7 days, video editing 2–4 days, and branding packages 10–21 days. Exact delivery times are shown on each package. We offer rush delivery on request.",
    category: "Process",
    active: true,
    displayOrder: 4,
  },
  {
    id: "faq-05",
    question: "Can I request a custom package?",
    answer: "Absolutely! If none of our standard packages fit your needs, contact us directly via WhatsApp or the contact form. We create custom packages tailored to your specific requirements and budget.",
    category: "Pricing",
    active: true,
    displayOrder: 5,
  },
  {
    id: "faq-06",
    question: "Do you offer urgent delivery?",
    answer: "Yes, we offer rush/urgent delivery for most services at an additional charge. Please mention your deadline when placing your order, and we will do our best to accommodate urgent requests.",
    category: "Process",
    active: true,
    displayOrder: 6,
  },
  {
    id: "faq-07",
    question: "How does the monthly creative service work?",
    answer: "After subscribing to a monthly plan, we schedule a brief onboarding call to understand your brand. We then deliver your monthly designs in weekly batches. You review, request revisions, and we finalize. All managed through WhatsApp or email.",
    category: "Monthly Plans",
    active: true,
    displayOrder: 7,
  },
  {
    id: "faq-08",
    question: "What payment methods are available?",
    answer: "We accept bKash, Nagad, bank transfer, and international payments via PayPal or Wise. A 50% advance is required to start, with the remaining 50% due upon delivery. Monthly subscriptions are billed at the start of each month.",
    category: "Pricing",
    active: true,
    displayOrder: 8,
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT HOME SECTIONS CONFIG
// ─────────────────────────────────────────────────────────────

export const DEFAULT_HOME_SECTIONS: HomeSectionConfig[] = [
  { id: "services_overview", label: "Services Overview", enabled: true, title: "What We Create", subtitle: "Explore our full range of creative services built for ambitious brands.", displayOrder: 1 },
  { id: "featured_services", label: "Featured Services", enabled: true, title: "Our Specialties", subtitle: "The services our clients love most.", displayOrder: 2 },
  { id: "pricing", label: "Service Pricing", enabled: true, title: "Transparent Pricing", subtitle: "Choose the package that fits your goals and budget. No hidden fees.", displayOrder: 3 },
  { id: "monthly_creative", label: "Monthly Creative", enabled: true, title: "Monthly Creative Subscription", subtitle: "Never run out of fresh content — we handle your social media visuals every month.", displayOrder: 4 },
  { id: "portfolio", label: "Portfolio", enabled: true, title: "Selected Works", subtitle: "Real projects. Real results. Browse our portfolio of creative work.", displayOrder: 5 },
  { id: "process", label: "Creative Process", enabled: true, title: "How We Work", subtitle: "A simple, proven process from brief to delivery.", displayOrder: 6 },
  { id: "why_choose_us", label: "Why Choose Us", enabled: true, title: "Why Brands Choose Qllix", subtitle: "We are more than designers — we are your creative growth partner.", displayOrder: 7 },
  { id: "testimonials", label: "Testimonials", enabled: true, title: "What Clients Say", subtitle: "Real feedback from real clients who trusted Qllix with their brand.", displayOrder: 8 },
  { id: "faq", label: "FAQ", enabled: true, title: "Frequently Asked Questions", subtitle: "Everything you need to know before getting started.", displayOrder: 9 },
  { id: "cta", label: "Final CTA", enabled: true, title: "Ready to Elevate Your Brand?", subtitle: "Let's build something great together.", ctaText: "Start Your Project", ctaUrl: "#order", displayOrder: 10 },
];

// ─────────────────────────────────────────────────────────────
// LEGACY SHOWCASE DATA (used by Hero)
// ─────────────────────────────────────────────────────────────

export const DEFAULT_SHOWCASE_ROW1: ShowcaseItem[] = [
  { id: "fitmate", title: "FITMATE Mobile App Experience", image: "/images/showcase/card_r1_01_fitmate.png", aspectRatio: 80 / 102 },
  { id: "affine", title: "Affine Risk Engine & Tablet OS", image: "/images/showcase/card_r1_02_affine.png", aspectRatio: 232 / 102, video: "https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4" },
  { id: "gummiz", title: "Gummiz Brand Identity", image: "/images/showcase/card_r1_03_gummiz.png", aspectRatio: 103 / 102 },
  { id: "the-gridline", title: "The Gridline Architectural Furniture", image: "/images/showcase/card_r1_04_gridline.png", aspectRatio: 232 / 102 },
  { id: "ter-ux", title: "ter UX Book & Interface", image: "/images/showcase/card_r1_05_ter.png", aspectRatio: 103 / 102 },
  { id: "fintech-leather", title: "Luxury Leather Banking Interface", image: "/images/showcase/card_r1_06_leather.png", aspectRatio: 136 / 102 },
  { id: "coffee-art", title: "OH! MY COFFEE Roasters Campaign", image: "/images/showcase/card_r1_07_coffee.png", aspectRatio: 61 / 102 },
];

export const DEFAULT_SHOWCASE_ROW2: ShowcaseItem[] = [
  { id: "cloud-saas", title: "Cloud AI Analytics Tablet", image: "/images/showcase/card_r2_01_tablet.png", aspectRatio: 157 / 102, video: "https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4" },
  { id: "yantrik", title: "Yantrik On-Demand Auto Tech Platform", image: "/images/showcase/card_r2_02_yantrik.png", aspectRatio: 137 / 102 },
  { id: "golf-club", title: "The Great Golf Club 3D Visuals", image: "/images/showcase/card_r2_03_golf.png", aspectRatio: 136 / 102, video: "https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4" },
  { id: "alpine-empower", title: "Alpine Empower Next-Gen Banking", image: "/images/showcase/card_r2_04_alpine.png", aspectRatio: 227 / 102 },
  { id: "venex", title: "VENEX Renewable Energy Grid UI", image: "/images/showcase/card_r2_05_venex.png", aspectRatio: 136 / 102 },
  { id: "zinggo", title: "Zinggo Street Burger Campaign", image: "/images/showcase/card_r2_06_zinggo.png", aspectRatio: 146 / 102 },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT TEAM MEMBERS (14 members)
// ─────────────────────────────────────────────────────────────

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-01",
    name: "Mohammad Alam",
    role: "Manager, Design & Creative",
    department: "Management & Design",
    imageUrl: "/images/team/mohammad-alam.png",
    active: true,
    displayOrder: 1,
  },
  {
    id: "tm-02",
    name: "Golam Rabbani",
    role: "Senior WordPress Developer",
    department: "Engineering",
    imageUrl: "/images/team/golam-rabbani.png",
    active: true,
    displayOrder: 2,
  },
  {
    id: "tm-03",
    name: "Ripan Hossain",
    role: "Team Lead",
    department: "Leadership",
    imageUrl: "/images/team/ripan-hossain.png",
    active: true,
    displayOrder: 3,
  },
  {
    id: "tm-04",
    name: "Rimon Ahmed",
    role: "Admin",
    department: "Operations",
    imageUrl: "/images/team/rimon-ahmed.png",
    active: true,
    displayOrder: 4,
  },
  {
    id: "tm-05",
    name: "Mehedi Hassan Emon",
    role: "Full-Stack Developer",
    department: "Engineering",
    imageUrl: "/images/team/mehedi-hassan-emon.png",
    active: true,
    displayOrder: 5,
  },
  {
    id: "tm-06",
    name: "Arsin Mahmud",
    role: "Frontend Developer",
    department: "Engineering",
    imageUrl: "/images/team/arsin-mahmud.png",
    active: true,
    displayOrder: 6,
  },
  {
    id: "tm-07",
    name: "Md Emran Hossen",
    role: "3D props & Environment Artist",
    department: "3D & Motion",
    imageUrl: "/images/team/md-emran-hossen.png",
    active: true,
    displayOrder: 7,
  },
  {
    id: "tm-08",
    name: "Mustak Sahariar Miraj",
    role: "Backend Developer",
    department: "Engineering",
    imageUrl: "/images/team/mustak-sahariar-miraj.png",
    active: true,
    displayOrder: 8,
  },
  {
    id: "tm-09",
    name: "Md. Ashiquer Rahman",
    role: "Motion Designer",
    department: "3D & Motion",
    imageUrl: "/images/team/md-ashiquer-rahman.png",
    active: true,
    displayOrder: 9,
  },
  {
    id: "tm-10",
    name: "Ahmmed Imtiaj Shahriar",
    role: "UX Researcher",
    department: "Product & UX",
    imageUrl: "/images/team/ahmmed-imtiaj-shahriar.png",
    active: true,
    displayOrder: 10,
  },
  {
    id: "tm-11",
    name: "Bitto",
    role: "Chief Design Officer",
    department: "Executive & Design",
    imageUrl: "/images/team/bitto.png",
    active: true,
    displayOrder: 11,
  },
  {
    id: "tm-12",
    name: "Zobayer Hossain",
    role: "Graphic Designer",
    department: "Design & Creative",
    imageUrl: "/images/team/zobayer-hossain.png",
    active: true,
    displayOrder: 12,
  },
  {
    id: "tm-13",
    name: "Md Habibur Rahman",
    role: "VFx Digital Compositor",
    department: "VFX & Video",
    imageUrl: "/images/team/md-habibur-rahman.png",
    active: true,
    displayOrder: 13,
  },
  {
    id: "tm-14",
    name: "Md Arafat Rahman",
    role: "Digital Marketing Specialist",
    department: "Marketing & Growth",
    imageUrl: "/images/team/md-arafat-rahman.png",
    active: true,
    displayOrder: 14,
  },
];

export const DEFAULT_CAMPAIGNS: CampaignOffer[] = [
  {
    id: "camp-01",
    title: "Seasonal Creative Sprint: Enjoy 25% Off",
    subtitle: "Limited Time Offer",
    badge: "Special Promo",
    description: "Unlock express creative delivery and priority sprint allocation.",
    code: "QLLIX25",
    discountPercent: 25,
    ctaText: "Claim 25% Off Now",
    ctaLink: "/pricing",
    imageUrl: "/images/campaign-banner.jpg",
    displayType: "both",
    active: true,
    countdownDate: "2026-10-30T23:59:59Z",
  },
];

export const DEFAULT_CONTACT_PAGE_CONFIG: ContactPageConfig = {
  badge: "Contact Us",
  headingLine1: "Tell Us Your",
  headingLine2: "Amazing",
  headingAccent: "Project Here",
  benefits: [
    "Expect a response from us within 24 hours",
    "We're happy to sign an NDA upon request.",
    "Get access to a team of dedicated product specialists.",
  ],
  imageUrl: "/images/contact_founder.jpg",
  serviceOptions: [
    "Ex. Web Design",
    "Brand & Visual Identity Design",
    "Next.js 14 & SaaS Platform Development",
    "Digital Marketing & CRO Funnels",
    "All-in-One Full Squad Growth",
  ],
  budgetOptions: [
    "Ex. ৳20K - ৳50K",
    "৳5,000 - ৳15,000 (MVP Sprint)",
    "৳15,000 - ৳35,000 (Flagship Build)",
    "৳35,000 - ৳75,000 (Scale-Up)",
    "৳75,000+ (Enterprise)",
  ],
};

// ─────────────────────────────────────────────────────────────
// DEFAULT CMS DATA (combined)
// ─────────────────────────────────────────────────────────────

export const DEFAULT_CMS_DATA: CmsData = {
  general: {
    agencyName: "Qllix",
    tagline: "Designing the Future of Your Brand",
    logoUrl: "/images/logo.png",
    footerLogoUrl: "/images/logo.png",
    faviconUrl: "/favicon.ico",
    contactEmail: "hello@qllix.com",
    adminPasscode: "admin2026",
    primaryColor: "#00FF87",
    secondaryColor: "#02180C",
    headingFont: "Playfair Display",
    bodyFont: "Inter",
    loadingBar: {
      enabled: true,
      color: "#00FF87",
      height: 3,
    },
    socialLinks: {
      facebook: "https://facebook.com/qllix",
      instagram: "https://instagram.com/qllix",
      linkedin: "https://linkedin.com/company/qllix",
      whatsapp: "+8801XXXXXXXXX",
    },
    offices: [
      { country: "Bangladesh", address: "Dhaka, Bangladesh", phone: "+880 1XXX-XXXXXX" },
    ],
  },
  banners: {
    home: {
      breadcrumb: "Home",
      line1Prefix: "Designing the ",
      line1Accent: "Future",
      line2Prefix: "of Your ",
      line2Accent: "Brand.",
      subtitle: "Your creative partner for graphic design, branding, video editing, and digital marketing. Premium quality. Affordable prices.",
      ctaText: "Start Your Project",
      ctaHref: "#order",
    },
    projects: {
      breadcrumb: "Projects",
      line1Prefix: "Our Creative ",
      line1Accent: "Portfolio",
      subtitle: "Real projects. Real results. Browse our work.",
      ctaText: "Start Your Project",
      ctaHref: "#order",
    },
    services: {
      breadcrumb: "Services",
      line1Prefix: "Premium Creative ",
      line1Accent: "Services",
      subtitle: "From logos to full brand systems — everything your brand needs to stand out.",
      ctaText: "Get a Quote",
      ctaHref: "#order",
    },
    pricing: {
      breadcrumb: "Pricing",
      line1Prefix: "Transparent ",
      line1Accent: "Pricing",
      subtitle: "Choose your package. No hidden fees. Pay in BDT.",
      ctaText: "Order Now",
      ctaHref: "#order",
    },
    contact: {
      breadcrumb: "Contact",
      line1Prefix: "Let's ",
      line1Accent: "Talk",
      subtitle: "Ready to start? We'd love to hear about your project.",
      ctaText: "Send a Message",
      ctaHref: "#contact-form",
    },
    about: {
      breadcrumb: "About",
      line1Prefix: "About ",
      line1Accent: "Qllix",
      subtitle: "A creative digital agency helping brands grow through design, video, and marketing.",
      ctaText: "Work With Us",
      ctaHref: "#order",
    },
    team: {
      breadcrumb: "Team",
      line1Prefix: "Meet The ",
      line1Accent: "Minds",
      subtitle: "The visionary designers, developers, and creative directors engineering the future of digital brands at Qllix.",
      ctaText: "Work With Us",
      ctaHref: "/contact",
    },
  },
  contactPage: DEFAULT_CONTACT_PAGE_CONFIG,
  showcase: {
    row1: DEFAULT_SHOWCASE_ROW1,
    row2: DEFAULT_SHOWCASE_ROW2,
  },
  inquiries: [
    {
      id: "inq-101",
      createdAt: "2026-09-20T14:30:00Z",
      fullName: "Mahfuzur Rahman",
      email: "mahfuz@example.com",
      whatsappCountryCode: "+880",
      whatsappNumber: "1712345678",
      service: "Full Brand Design",
      budget: "৳18,000",
      details: "Need a complete brand identity for my new e-commerce business.",
      status: "new",
    },
  ],
  agencyServices: DEFAULT_AGENCY_SERVICES,
  packages: DEFAULT_PACKAGES,
  orders: [],
  portfolioItems: DEFAULT_PORTFOLIO_ITEMS,
  agencyTestimonials: DEFAULT_TESTIMONIALS,
  agencyFaqs: DEFAULT_FAQS,
  homeSections: DEFAULT_HOME_SECTIONS,
  teamMembers: DEFAULT_TEAM_MEMBERS,
  footerOrbitImages: [
    "/images/team/arsin-mahmud.png",
    "/images/team/mehedi-hassan-emon.png",
    "/images/team/md-arafat-rahman.png",
    "/images/team/bitto.png",
    "/images/team/md-ashiquer-rahman.png",
    "/images/team/mustak-sahariar-miraj.png",
  ],
  campaigns: DEFAULT_CAMPAIGNS,
  affiliateConfig: {
    enabled: true,
    minProjectAmount: 20000,
    commissionPercent: 20,
    badge: "AFFILIATE & PARTNER PROGRAM",
    title: "Refer Projects & Earn Flat 20% Commission",
    subtitle: "২০,০০০ টাকার উপরের যেকোনো ব্র্যান্ডিং, ডিজাইন বা ভিডিও প্রজেক্ট রেফার করলেই প্রতিটি সাকসেসফুল ডিলে সাথে সাথে পান ফ্ল্যাট ২০% ক্যাশ কমিশন (৳৪,০০০+ ক্যাশ পে-আউট)!",
    ctaText: "Become an Affiliate Partner",
    secondaryCtaText: "Submit a Client Lead",
    payoutTerms: "Instant payout via bKash, Nagad, or Bank Transfer upon client deal confirmation and advance payment.",
  },
  affiliatePartners: [
    {
      id: "aff-101",
      fullName: "Tanvir Ahmed",
      phone: "01712345678",
      email: "tanvir@gmail.com",
      payoutMethod: "bkash",
      payoutNumber: "01712345678",
      referralCode: "QLX-PARTNER-101",
      profession: "Digital Marketer & Agency Partner",
      status: "active",
      createdAt: "2026-08-10T10:00:00.000Z",
    },
  ],
  affiliateLeads: [
    {
      id: "lead-101",
      referrerName: "Tanvir Ahmed",
      referrerPhone: "01712345678",
      referrerCode: "QLX-PARTNER-101",
      clientName: "Nafis Packaging & Foods",
      clientPhone: "01898765432",
      clientEmail: "nafis@foodsbd.com",
      serviceCategory: "Branding & Packaging",
      projectBudget: 35000,
      commissionEarned: 7000,
      projectDetails: "Complete packaging and label design for 5 product lines.",
      status: "deal_closed",
      payoutTrxId: "BK99X481L",
      createdAt: "2026-08-15T14:30:00.000Z",
    },
  ],
};

export const CMS_STORAGE_KEY = "qllix_cms_v5";
export const ADMIN_AUTH_KEY = "qllix_admin_auth_session";
