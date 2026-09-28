export interface PricingPackage {
  price: string;
  subtitle: string;
  title: string;
  highlightColor?: string;
  isPopular?: boolean;
  features: string[];
}

export interface PricingCategoryGroup {
  name: string;
  subTabs: string[];
  packages: Record<string, PricingPackage[]>;
}

export type PricingConfigType = Record<string, PricingCategoryGroup>;

export const DEFAULT_PRICING_CONFIG: PricingConfigType = {
  website: {
    name: "Websites",
    subTabs: ["1–4 Pages", "5–9 Pages", "10–15 Pages", "16–25 Pages", "Enterprise"],
    packages: {
      "1–4 Pages": [
        {
          price: "৳1,800",
          subtitle: "Design Only",
          title: "Launch Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "UX Research & User Journey Wireframing",
            "High-Fidelity UI Interface Design",
            "Responsive Mobile & Tablet UX Architecture",
            "Interactive Figma Prototype",
            "Core Design System & Style Tokens",
            "Developer Handoff Master Files",
            "Unlimited Design Iterations"
          ]
        },
        {
          price: "৳2,880",
          subtitle: "Design + Development",
          title: "Growth Package",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything included in Launch Package",
            "Production Next.js 14 / Webflow Codebase",
            "Edge Hosting, Custom Domain & DNS Setup",
            "Google Analytics 4 & Meta Conversion API",
            "99+ Google Core Web Vitals Guaranteed",
            "Interactive Micro-Animations & Framer Motion",
            "60 Days Post-Launch Support & Warranty"
          ]
        },
        {
          price: "৳3,960",
          subtitle: "Design + Code + Branding",
          title: "Signature Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything included in Growth Package",
            "Complete Technical & Structured Schema SEO",
            "90 Days Dedicated Priority Partner Support",
            "Adaptive Vector Logo Suite & Guidelines",
            "Custom 3D / Vector Graphic Visuals",
            "Dark / Light Mode Theme Architecture",
            "Multi-Language (i18n) Readiness"
          ]
        }
      ],
      "5–9 Pages": [
        {
          price: "৳3,150",
          subtitle: "Design Only",
          title: "Launch Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "UX Research & 5–9 Page User Flows",
            "High-Fidelity Premium UI Interface Design",
            "Mobile, Tablet & Desktop Responsive Layouts",
            "Interactive Figma Clickable Prototype",
            "25+ Component Modular Design System",
            "Developer Handoff Specification Book",
            "Unlimited Revisions"
          ]
        },
        {
          price: "৳4,700",
          subtitle: "Design + Development",
          title: "Growth Package",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything included in Launch Package",
            "Next.js 14 App Router / Webflow CMS Engine",
            "Fluid Micro-Animations & Dynamic CMS Blocks",
            "Sub-Second Global Edge Load Speeds",
            "Technical SEO & OpenGraph Social Sharing",
            "60 Days Free Maintenance & Direct Support"
          ]
        },
        {
          price: "৳6,200",
          subtitle: "Design + Code + Brand Assets",
          title: "Signature Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything included in Growth Package",
            "Custom Vector Brand System & Style Guide",
            "3 High-Converting Paid Ad Landing Pages",
            "Server-Side Conversion API (CAPI) Integration",
            "90 Days Dedicated Priority Partner SLA",
            "Full Commercial Copyright Transfer"
          ]
        }
      ],
      "10–15 Pages": [
        {
          price: "৳4,800",
          subtitle: "Design Only",
          title: "Launch Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Full UX Architecture & Multi-Page Funnels",
            "High-Fidelity UI Across 10–15 Templates",
            "Comprehensive Figma Design System Tokens",
            "Interactive Multi-Breakpoint Prototype",
            "Developer Handoff Specifications",
            "Unlimited Iterations Guarantee"
          ]
        },
        {
          price: "৳7,200",
          subtitle: "Design + Development",
          title: "Growth Package",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything included in Launch Package",
            "Production Next.js 14 Architecture",
            "Custom CMS Collections & Filter Pipelines",
            "Sub-Second Global Edge Performance",
            "Built-in Technical SEO & Schema Markup",
            "90 Days Post-Launch Warranty & Support"
          ]
        },
        {
          price: "৳9,600",
          subtitle: "Full Turnkey Web Platform",
          title: "Signature Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything included in Growth Package",
            "Complete Visual Rebrand & Style Manual",
            "Interactive Product Visualizer / Calculators",
            "CRM & Marketing Automation Integrations",
            "Dedicated Private Slack Channel With Leads",
            "6 Months Post-Launch Support & Warranty"
          ]
        }
      ],
      "16–25 Pages": [
        {
          price: "৳7,500",
          subtitle: "Design Only",
          title: "Launch Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Large-Scale Information Architecture",
            "16–25 Modular Page Templates in Figma",
            "Extensive Enterprise Design System Kit",
            "Interactive Prototyping & Usability Audits",
            "Unlimited Design Revisions"
          ]
        },
        {
          price: "৳11,500",
          subtitle: "Design + Development",
          title: "Growth Package",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything included in Launch Package",
            "Full Next.js 14 Enterprise Codebase",
            "Headless CMS Architecture (Sanity / Strapi)",
            "Dynamic Search, Filter & Content Tagging",
            "Sub-Second Global Load Time Guarantee",
            "6 Months SLA & Direct Engineer Support"
          ]
        },
        {
          price: "৳15,800",
          subtitle: "Enterprise Digital Ecosystem",
          title: "Signature Package",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything included in Growth Package",
            "Multi-Region i18n Localization Engine",
            "Full Brand Identity & Media Assets Suite",
            "Custom API Gateways & Database Connections",
            "1-Year Priority SLA & Security Audits",
            "Dedicated Lead Engineer & Designer"
          ]
        }
      ],
      "Enterprise": [
        {
          price: "৳12,000+",
          subtitle: "Custom Architecture",
          title: "Bespoke Enterprise",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Tailored Enterprise Discovery & UX Roadmaps",
            "Unlimited Custom Templates & Interactive Components",
            "Micro-Frontends or Monorepo Next.js Architecture",
            "Enterprise Security Audits & SOC2 Readiness",
            "Custom SSO, Role-Based Access & Integrations",
            "Dedicated 24/7 SLA & Direct Executive Team Access"
          ]
        }
      ]
    }
  },
  webapp: {
    name: "Web Apps & SaaS",
    subTabs: ["MVP Sprint", "Scale Platform", "Enterprise SaaS"],
    packages: {
      "MVP Sprint": [
        {
          price: "৳3,800",
          subtitle: "UI/UX Architecture",
          title: "SaaS UX Design",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "User Workflow Architecture & Journey Maps",
            "Full SaaS Dashboard & Auth Flow Screens",
            "Component Design System in Figma",
            "Interactive Clickable Click-Through Prototype",
            "Developer Documentation & Handoff"
          ]
        },
        {
          price: "৳6,800",
          subtitle: "UI + Next.js 14 Build",
          title: "SaaS MVP Launch",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything in SaaS UX Design",
            "Next.js 14 + Tailwind CSS + TypeScript Build",
            "Supabase / Prisma ORM Database Setup",
            "Stripe Subscription & Billing Portal",
            "NextAuth / Clerk Authentication Flows",
            "60 Days Warranty & Technical Support"
          ]
        },
        {
          price: "৳9,400",
          subtitle: "Full-Stack Turnkey",
          title: "Scale-Ready MVP",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in SaaS MVP Launch",
            "Real-Time WebSockets / Push Notifications",
            "Admin Telemetry & Analytics Dashboard",
            "Automated Email Lifecycle (Resend / Postmark)",
            "CI/CD Pipeline with Automated Testing",
            "90 Days Dedicated SLA Support"
          ]
        }
      ],
      "Scale Platform": [
        {
          price: "৳5,900",
          subtitle: "UX & Advanced Design",
          title: "Platform UI Suite",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Deep Data Visualization & Chart Workflows",
            "Complex Multitenant UX Architecture",
            "Comprehensive Figma Design Tokens",
            "Interactive Clickable High-Fidelity Prototype"
          ]
        },
        {
          price: "৳11,800",
          subtitle: "Full Production Build",
          title: "Scale Flagship",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything in Platform UI Suite",
            "Scalable Next.js 14 Cloud Infrastructure",
            "Multitenant Organization & Team Workspaces",
            "Role-Based Access Control (RBAC)",
            "Stripe Usage-Based Metered Billing",
            "90 Days Senior Engineering SLA"
          ]
        },
        {
          price: "৳16,500",
          subtitle: "Enterprise Ready",
          title: "Growth Beast",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in Scale Flagship",
            "Custom AI Model Integrations / LLM Workflows",
            "Audit Logs, Webhooks & Public Developer API",
            "High-Throughput Caching (Upstash / Redis)",
            "6 Months Dedicated Support & Maintenance"
          ]
        }
      ],
      "Enterprise SaaS": [
        {
          price: "৳18,000+",
          subtitle: "Enterprise Custom",
          title: "Custom SaaS Suite",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Enterprise Architecture & Security Audits",
            "Custom SSO (SAML / Okta / Azure AD)",
            "High-Availability Cloud Architecture",
            "SOC2 / HIPAA Compliant Data Flow Pipelines",
            "Dedicated Lead Architect & Senior Engineer",
            "1-Year Priority Support SLA"
          ]
        }
      ]
    }
  },
  branding: {
    name: "Brand & Visuals",
    subTabs: ["Startup Sprint", "Full Identity Suite", "Enterprise Rebrand"],
    packages: {
      "Startup Sprint": [
        {
          price: "৳1,800",
          subtitle: "Essentials",
          title: "Brand Starter",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Primary Vector Logo Mark & Wordmark",
            "Curated Color Palette & Contrast Specs",
            "Typography Hierarchy Pairing Rules",
            "Brand Style Sheet One-Pager",
            "Full Vector Source Assets (SVG, AI, EPS)"
          ]
        },
        {
          price: "৳2,800",
          subtitle: "Complete Identity",
          title: "Brand Flagship",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything in Brand Starter",
            "Adaptive Logo Variations & App Icons",
            "Comprehensive 30+ Page Brand Guidelines",
            "Social Media Starter Template Kit (15+ Assets)",
            "Stationery & Business Card Print Files",
            "Unlimited Design Revisions"
          ]
        },
        {
          price: "৳4,200",
          subtitle: "360° Visual World",
          title: "Brand Dominance",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in Brand Flagship",
            "Custom 3D Brand Marks & Render Pack",
            "Product Packaging / Merch Guidelines",
            "15-Slide Investor Pitch Deck in Figma",
            "Motion Logo Sting (4K 60FPS Video)",
            "Complete Copyright Ownership Transfer"
          ]
        }
      ],
      "Full Identity Suite": [
        {
          price: "৳3,400",
          subtitle: "Corporate Identity",
          title: "Visual System",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Market Research & Strategic Brand Positioning",
            "Comprehensive Adaptive Logo System",
            "40+ Page Institutional Brand Guidelines",
            "30+ Social Media Creative Design Templates"
          ]
        },
        {
          price: "৳5,200",
          subtitle: "Identity + Digital",
          title: "Identity Flagship",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Everything in Visual System",
            "Custom Vector Iconography Library (50+ Marks)",
            "Investor Pitch Deck & Corporate Keynotes",
            "Digital Ad Creative Campaign Kit",
            "Animated Motion Logo Ident",
            "Unlimited Revisions & Dedicated Director"
          ]
        },
        {
          price: "৳7,800",
          subtitle: "Ecosystem Suite",
          title: "Global Presence",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in Identity Flagship",
            "Physical Packaging & Industrial Print Specs",
            "Custom 3D Product Visualizations",
            "Trade Show & Billboard Display Assets",
            "Complete Intellectual Property Transfer"
          ]
        }
      ],
      "Enterprise Rebrand": [
        {
          price: "৳9,500+",
          subtitle: "Corporate Overhaul",
          title: "Enterprise Rebrand",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Holistic Brand Architecture & Sub-Brand Strategy",
            "Multi-Platform Design Token Synchronizer",
            "Complete Marketing Collateral & Keynote Suites",
            "Internal Employee Rollout Workshops",
            "Direct Creative Director Partnership"
          ]
        }
      ]
    }
  },
  marketing: {
    name: "Growth & Ads",
    subTabs: ["Performance Ads", "Full-Funnel CRO", "Omnichannel Dominance"],
    packages: {
      "Performance Ads": [
        {
          price: "৳2,400/mo",
          subtitle: "Media Buying",
          title: "Ad Accelerator",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Meta (FB/IG) or Google Ads Management",
            "Ad Account Audit & Tracking Pixel CAPI Setup",
            "8 New Static Ad Variations Monthly",
            "Audience Research & Laser Segmentation",
            "Bi-Weekly Strategic Performance Reports"
          ]
        },
        {
          price: "৳3,800/mo",
          subtitle: "Multi-Channel Scale",
          title: "Growth Engine",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Meta + Google Ads Dual-Channel Buying",
            "16 New Creatives Monthly (Static + Short Video)",
            "Dedicated High-Converting Landing Page",
            "Continuous A/B Copy & Creative Testing",
            "Weekly Strategic Syncs & Real-Time Dashboard",
            "Guaranteed 3.5x+ Blended ROAS Target"
          ]
        },
        {
          price: "৳5,900/mo",
          subtitle: "Maximum Traction",
          title: "Scale Retainer",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in Growth Engine",
            "Omnichannel Buying (Meta + Google + YouTube + TikTok)",
            "3 Dedicated High-Intent Landing Pages",
            "Weekly Motion Video Ad Cuts & Iterations",
            "Full Lifecycle Email Sequences (Klaviyo)",
            "Daily Slack Sync & Dedicated Media Buyer"
          ]
        }
      ],
      "Full-Funnel CRO": [
        {
          price: "৳3,200",
          subtitle: "One-Time Sprint",
          title: "CRO Audit Sprint",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Full Funnel Heatmap & Session Recording Audit",
            "Checkout Drop-Off & Friction Diagnostics",
            "UX Heuristic Analysis & Optimization Roadmap",
            "High-Converting Wireframe Recommendations"
          ]
        },
        {
          price: "৳4,800/mo",
          subtitle: "Continuous Testing",
          title: "Conversion Engine",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Ongoing Multivariate A/B Testing",
            "2 New Custom Landing Pages Engineered Monthly",
            "Form & Checkout Friction Elimination",
            "Speed Optimization & Core Web Vitals Tuning",
            "Average +40% Conversion Uplift Target"
          ]
        },
        {
          price: "৳7,200/mo",
          subtitle: "Enterprise Scale",
          title: "Funnel Monopoly",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Everything in Conversion Engine",
            "Dynamic Personalization & Segmented Experiences",
            "Custom Next.js Sub-Second Landing Pages",
            "Full-Funnel Attribution Analytics Architecture",
            "Dedicated CRO Specialist & Developer"
          ]
        }
      ],
      "Omnichannel Dominance": [
        {
          price: "৳8,500+/mo",
          subtitle: "Turnkey Growth Team",
          title: "Enterprise Growth",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Full-Stack Growth Marketing & Media Buying Team",
            "Unlimited High-Production Ad Creatives & Video Cuts",
            "Dedicated Funnel Engineering & Rapid Deployments",
            "Weekly Executive ROI Briefings & Live Dashboards",
            "Direct Slack Channel with Growth Partners"
          ]
        }
      ]
    }
  },
  subscription: {
    name: "Dedicated Retainers",
    subTabs: ["Dedicated Squad", "Design + Code Retainer"],
    packages: {
      "Dedicated Squad": [
        {
          price: "৳4,200/mo",
          subtitle: "Dedicated Talent",
          title: "Dedicated Senior Designer",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "1 Senior Product / Visual Designer Full-Time",
            "One Active Request at a Time",
            "Average 48-Hour Turnaround Time",
            "Figma Source Files & Production Assets",
            "Pause or Cancel Anytime"
          ]
        },
        {
          price: "৳6,800/mo",
          subtitle: "Cross-Functional",
          title: "Design + Code Squad",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "1 Senior Product Designer + 1 Full-Stack Engineer",
            "Simultaneous Design & Next.js Development",
            "Continuous Daily Shipping Rhythm",
            "Direct Slack Access with Both Leads",
            "Unlimited Revisions & Flexible Scope",
            "Pause or Cancel Anytime"
          ]
        },
        {
          price: "৳11,500/mo",
          subtitle: "Full Agency Muscle",
          title: "Complete Growth Squad",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Senior Designer + Full-Stack Engineer + Media Buyer",
            "End-to-End Product & Marketing Execution",
            "Weekly Sprint Planning & Strategic Direction",
            "Direct Slack Channel & Same-Day Response",
            "Guaranteed Priority Availability"
          ]
        }
      ],
      "Design + Code Retainer": [
        {
          price: "৳5,400/mo",
          subtitle: "Sprint Velocity",
          title: "Sprint Retainer",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Bi-Weekly Feature Sprints Shipped to Production",
            "Next.js 14 Codebase Maintenance & New Features",
            "UI/UX Enhancements & Optimization Iterations",
            "Direct Access to Senior Engineering Lead"
          ]
        },
        {
          price: "৳8,900/mo",
          subtitle: "Hyper-Velocity",
          title: "Hyper-Growth Retainer",
          highlightColor: "text-emerald-glow",
          isPopular: true,
          features: [
            "Weekly Sprints Shipped Continuously",
            "Design Systems, Front-End & Backend Engineering",
            "Lighthouse 99+ Speed & SEO Maintenance",
            "Zero Red Tape, Direct Private Slack Channel",
            "Pause or Cancel Anytime"
          ]
        },
        {
          price: "৳14,500/mo",
          subtitle: "Enterprise Velocity",
          title: "Enterprise Retainer",
          highlightColor: "text-emerald-glow",
          isPopular: false,
          features: [
            "Full Dedicated Squad with Executive Partner Lead",
            "Priority 24/7 SLA & Incident Response",
            "Custom Feature Pipelines & Dedicated Code Reviews",
            "Monthly Executive Strategy Sessions"
          ]
        }
      ]
    }
  }
};
