export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  serviceCategory: "Graphic Design" | "Web Design" | "Digital Marketing" | "Full-Stack Growth";
  serviceCategoryBn: string;
  price: string;
  period: string;
  timeline: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  featuredColor: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "brand-sprint",
    name: "Brand Identity Sprint",
    serviceCategory: "Graphic Design",
    serviceCategoryBn: "Graphic Design",
    price: "৳25,000",
    period: "One-Time Sprint",
    timeline: "7–10 Business Days",
    description: "A comprehensive, iconic visual identity package engineered for high-growth startups and visionary founders.",
    deliverables: [
      "Complete Brand Strategy & Visual Positioning",
      "Adaptive Vector Logo Suite (Primary, Secondary, Monogram)",
      "Curated Typography Scale, Color Palette & Contrast Specs",
      "Social Media Ad & Post Templates (15+ Figma Assets)",
      "Comprehensive Brand Guidelines Manual (PDF & Figma Master)",
      "Full Commercial Copyright Transfer & Source Assets"
    ],
    ctaLabel: "Book Brand Sprint",
    featuredColor: "#00FF87"
  },
  {
    id: "web-sprint",
    name: "Web Flagship Sprint",
    popular: true,
    badge: "Most Popular",
    serviceCategory: "Web Design",
    serviceCategoryBn: "Web Development",
    price: "৳50,000",
    period: "One-Time Sprint",
    timeline: "2–3 Weeks",
    description: "Custom, ultra-fast Next.js 14 or Webflow platform built for world-class aesthetics and maximum conversions.",
    deliverables: [
      "Full UX Architecture & Interactive Figma Prototype",
      "Up to 8 Custom Responsive Web Pages",
      "Production-Grade Next.js 14 / Tailwind CSS Build",
      "Silky Smooth Micro-Animations & Dark Mode Support",
      "95+ Google Core Web Vitals Guaranteed Performance",
      "CMS Setup & Structured Technical SEO Integration",
      "30 Days Post-Launch Warranty & Direct Support"
    ],
    ctaLabel: "Start Website Build",
    featuredColor: "#00FF87"
  },
  {
    id: "growth-retainer",
    name: "Performance Growth Engine",
    serviceCategory: "Digital Marketing",
    serviceCategoryBn: "Performance Marketing",
    price: "৳35,000",
    period: "Per Month",
    timeline: "Monthly Retainer",
    description: "Targeted Meta & Google media buying, continuous CRO testing, and relentless ad creative iterations.",
    deliverables: [
      "Meta (FB/IG) & Google Ads Media Buying & Scaling",
      "Weekly High-Converting Ad Creative Production (Static & Video)",
      "Full-Funnel Retargeting & Custom Audience Segmentation",
      "Continuous Landing Page A/B Split Testing (CRO)",
      "Server-Side Conversion API (CAPI) & GA4 Architecture",
      "Weekly Strategic Syncs & 24/7 Live KPI Dashboard"
    ],
    ctaLabel: "Start Growth Retainer",
    featuredColor: "#00DF81"
  },
  {
    id: "full-stack-bundle",
    name: "All-in-One Growth Bundle",
    badge: "Maximum Value • Save 25%",
    serviceCategory: "Full-Stack Growth",
    serviceCategoryBn: "Full-Stack Bundle",
    price: "৳85,000",
    period: "Complete Turnkey Package",
    timeline: "4–5 Weeks",
    description: "The complete 360° agency powerhouse: Brand Identity + Custom Next.js Platform + 1st Month Launch Campaign.",
    deliverables: [
      "Full Brand Identity Sprint (Logos, Guidelines, Social Ad Kit)",
      "Custom Next.js Web Flagship (Up to 12 Pages)",
      "3 Dedicated High-Converting Paid Ad Landing Pages",
      "First Month Meta & Google Ads Setup, Launch & Optimization",
      "20+ Launch Ad Creatives, Motion Cuts & Banners",
      "Dedicated Slack Channel & 24/7 Priority Partner Access"
    ],
    ctaLabel: "Launch Full Ecosystem",
    featuredColor: "#00FF87"
  }
];

export interface EstimatorAddon {
  id: string;
  name: string;
  category: "graphic" | "web" | "marketing";
  price: number;
  durationDays: number;
}

export const ESTIMATOR_ADDONS: EstimatorAddon[] = [
  { id: "logo-system", name: "Custom Logo Suite & Brand Guidelines", category: "graphic", price: 5000, durationDays: 7 },
  { id: "social-kit", name: "30-Day Social Ad Creatives Kit", category: "graphic", price: 3500, durationDays: 4 },
  { id: "pitch-deck", name: "Investor Pitch Deck (15 Slides)", category: "graphic", price: 4500, durationDays: 5 },
  { id: "landing-page", name: "High-Converting Sales Landing Page", category: "web", price: 6000, durationDays: 6 },
  { id: "full-website", name: "Multi-Page Custom Web Platform", category: "web", price: 18000, durationDays: 14 },
  { id: "saas-dashboard", name: "Complex SaaS Web App UI & Codebase", category: "web", price: 25000, durationDays: 18 },
  { id: "meta-ads", name: "Meta (FB/IG) Paid Acquisition Setup", category: "marketing", price: 8000, durationDays: 7 },
  { id: "google-ads", name: "Google High-Intent Search Ads Setup", category: "marketing", price: 8000, durationDays: 7 },
  { id: "cro-audit", name: "Conversion Rate Optimization (CRO) Audit", category: "marketing", price: 4000, durationDays: 3 }
];
