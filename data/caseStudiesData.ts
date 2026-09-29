export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: "all" | "web-design" | "graphic-design" | "digital-marketing";
  categoryLabel: string;
  industry: string;
  tagline: string;
  challenge: string;
  solution: string;
  image: string;
  results: {
    stat: string;
    label: string;
  }[];
  tags: string[];
  year: string;
  gradientTheme: string;
  accentColor: string;
  visualPreview: {
    type: "dashboard" | "branding" | "marketing" | "mobile";
    accentWord: string;
    highlightColor: string;
  };
}

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "novapay-fintech",
    title: "NovaPay Global FinTech",
    client: "NovaPay Financial Technologies",
    category: "web-design",
    categoryLabel: "Web & Mobile App",
    industry: "FinTech",
    tagline: "Next-gen cross-border mobile payment and wealth management architecture",
    challenge: "The client's legacy platform suffered from a 4.2-second load time, convoluted checkout funnel friction, and a 68% drop-off rate on mobile devices.",
    solution: "Engineered a ground-up rebuild using Next.js 14 featuring an ultra-clean mobile-first dark interface, instant biometric KYC verification, and live currency exchange calculators.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "+210%", label: "Conversion Rate Increase" },
      { stat: "0.28s", label: "Page Load Speed" },
      { stat: "$14.2M+", label: "Processed Transactions" }
    ],
    tags: ["FinTech", "Next.js 14", "Mobile UI/UX", "Payment Gateway", "Figma"],
    year: "2025",
    gradientTheme: "from-emerald-500/20 via-cyan-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "mobile",
      accentWord: "FinTech Platform",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "vortex-gear",
    title: "Vortex Performance Wear",
    client: "Vortex Athletics UK",
    category: "digital-marketing",
    categoryLabel: "ecommerce & Growth",
    industry: "ecommerce",
    tagline: "Scaling a DTC technical apparel brand from $50k to $420k monthly run-rate",
    challenge: "Despite superior garment quality, the brand could not scale ad spend beyond $10k/month without ROAS crashing to 1.5x due to creative fatigue.",
    solution: "Produced 60+ dynamic motion video ad variations, engineered a frictionless 1-click checkout flow, and established high-converting creator whitelisting.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "$420k+", label: "Monthly Gross Revenue" },
      { stat: "4.1x", label: "Blended Paid ROAS" },
      { stat: "65,000+", label: "New Customers Acquired" }
    ],
    tags: ["ecommerce", "Meta Performance Ads", "Apparel", "Klaviyo", "Video Creatives"],
    year: "2025",
    gradientTheme: "from-cyan-500/20 via-emerald-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "marketing",
      accentWord: "E-Commerce Scale",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "yantrik-auto",
    title: "Yantrik On-Demand Auto Tech",
    client: "Yantrik Technologies",
    category: "web-design",
    categoryLabel: "Web & IoT Platform",
    industry: "Automotive",
    tagline: "Connected vehicle diagnostics and roadside fleet dispatch platform",
    challenge: "Dispatching vehicle recovery units required 15+ minutes due to fragmented legacy dispatch tables and lack of real-time GPS fleet telemetry.",
    solution: "Built a lightning-fast Next.js 14 dispatch control center with real-time Mapbox tracking, automated driver allocation, and instant mobile driver booking.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "< 4 Min", label: "Dispatch Response Time" },
      { stat: "+340%", label: "Fleet Booking Growth" },
      { stat: "99.98%", label: "Platform Uptime SLA" }
    ],
    tags: ["Automotive", "Next.js 14", "IoT Telemetry", "Real-Time Maps", "Fleet Tech"],
    year: "2025",
    gradientTheme: "from-emerald-500/20 via-teal-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "dashboard",
      accentWord: "Auto Tech Platform",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "aura-botanics",
    title: "Aura Botanics Luxury",
    client: "Aura Organics London",
    category: "graphic-design",
    categoryLabel: "Brand & Packaging",
    industry: "Beauty & Cosmetics",
    tagline: "Premium visual identity and bespoke eco-luxury packaging design",
    challenge: "A premium organic beauty brand struggled to differentiate itself in high-end department stores due to fragmented, dated packaging assets.",
    solution: "Crafted a bespoke minimalist typography system, metallic-embossed luxury box packaging, and 120+ modular social media campaign design templates.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "3.4x", label: "Retail Shelf Expansion" },
      { stat: "+185%", label: "DTC Online Sales" },
      { stat: "100%", label: "Brand Uniformity Score" }
    ],
    tags: ["Beauty & Cosmetics", "Packaging Design", "Vector Guidelines", "Art Direction", "Luxury"],
    year: "2025",
    gradientTheme: "from-teal-500/20 via-emerald-500/10 to-obsidian-900",
    accentColor: "#00DF81",
    visualPreview: {
      type: "branding",
      accentWord: "Visual Identity",
      highlightColor: "#00DF81"
    }
  },
  {
    id: "zenith-ai",
    title: "Zenith Intelligence",
    client: "Zenith AI Labs",
    category: "web-design",
    categoryLabel: "SaaS & AI Interface",
    industry: "SaaS & AI",
    tagline: "Transforming complex deep learning model training into an intuitive SaaS workflow",
    challenge: "An enterprise AI platform required a web portal that made deep learning model deployment clear and friction-free for non-technical stakeholders.",
    solution: "Designed and built a world-class SaaS interface featuring real-time GPU telemetry widgets, dark interactive node visualizers, and 1-click deployment flows.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "14 Days", label: "Concept to Live Launch" },
      { stat: "98/100", label: "Lighthouse Performance" },
      { stat: "+160%", label: "Free-to-Paid Upgrades" }
    ],
    tags: ["SaaS & AI", "React", "TypeScript", "Dark UI", "AI Platform"],
    year: "2025",
    gradientTheme: "from-emerald-500/25 via-purple-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "dashboard",
      accentWord: "AI Interface",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "hyperscale-saas",
    title: "HyperScale Cloud Systems",
    client: "HyperScale Tech Corp",
    category: "digital-marketing",
    categoryLabel: "eCRM Portals & Growth",
    industry: "eCRM Portals",
    tagline: "High-converting enterprise acquisition pipelines delivering 4.8x paid ROAS",
    challenge: "Unchecked customer acquisition costs were climbing rapidly due to creative fatigue and low trial booking rates on existing landing pages.",
    solution: "Executed hyper-targeted Meta & Google ad campaigns paired with 24 dedicated high-intent landing pages and automated multi-stage retargeting funnels.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "4.8x", label: "Average Paid ROAS" },
      { stat: "-42%", label: "Customer Acquisition Cost" },
      { stat: "+380%", label: "Qualified Sales Leads" }
    ],
    tags: ["eCRM Portals", "Google Ads", "CRO", "Attribution Tracking", "B2B SaaS"],
    year: "2025",
    gradientTheme: "from-blue-500/20 via-emerald-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "marketing",
      accentWord: "Ad Performance",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "lumina-health",
    title: "Lumina Telehealth",
    client: "Lumina Health Network",
    category: "graphic-design",
    categoryLabel: "HealthTech & Telehealth",
    industry: "Healthcare",
    tagline: "Complete visual rebranding and next-gen patient booking platform",
    challenge: "An outdated visual identity and cumbersome scheduling portal hindered patient confidence and digital adoption.",
    solution: "Rebuilt the entire brand ecosystem with cyber-emerald accents, accessible typography, and an intuitive doctor booking web app.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "+320%", label: "Online Booking Growth" },
      { stat: "4.9/5", label: "Patient UX Satisfaction" },
      { stat: "100%", label: "HIPAA Compliant UI" }
    ],
    tags: ["Healthcare", "Branding", "Webflow", "Design System", "Telehealth"],
    year: "2025",
    gradientTheme: "from-emerald-400/20 via-teal-500/10 to-obsidian-900",
    accentColor: "#00DF81",
    visualPreview: {
      type: "branding",
      accentWord: "Brand System",
      highlightColor: "#00DF81"
    }
  },
  {
    id: "apex-consulting",
    title: "Apex Strategic Advisory",
    client: "Apex Partners Global",
    category: "web-design",
    categoryLabel: "Business Consulting",
    industry: "Business Consulting",
    tagline: "High-trust digital keynote and client portal for M&A advisory firm",
    challenge: "Tier-1 institutional clients were receiving pitch decks through fragmented email attachments without encrypted audit trails.",
    solution: "Engineered an ultra-secure client portal in Next.js 14 featuring real-time deal data rooms, interactive financial models, and seamless executive scheduling.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "$2.4B+", label: "Advisory Deals Facilitated" },
      { stat: "100%", label: "Encrypted Data Room Audit" },
      { stat: "4.9/5", label: "Executive UX Score" }
    ],
    tags: ["Business Consulting", "FinTech", "Next.js 14", "Security", "Portal"],
    year: "2025",
    gradientTheme: "from-emerald-500/20 via-cyan-500/10 to-obsidian-900",
    accentColor: "#00FF87",
    visualPreview: {
      type: "dashboard",
      accentWord: "Advisory Portal",
      highlightColor: "#00FF87"
    }
  },
  {
    id: "learndojo-edtech",
    title: "LearnDojo Interactive Learning",
    client: "LearnDojo Global Education",
    category: "web-design",
    categoryLabel: "EdTech Platform",
    industry: "EdTech",
    tagline: "Gamified micro-learning platform for 250,000+ engineers worldwide",
    challenge: "Low course completion rates (12%) due to text-heavy tutorials and rigid, uninspiring course navigation interfaces.",
    solution: "Architected a gamified interactive learning platform with real-time code sandboxes, interactive milestone rewards, and instant peer reviews.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85",
    results: [
      { stat: "68%", label: "Course Completion Rate" },
      { stat: "250k+", label: "Active Student Engineers" },
      { stat: "+280%", label: "Annual Subscription Growth" }
    ],
    tags: ["EdTech", "Gamification", "Next.js 14", "Interactive Code", "UI/UX"],
    year: "2025",
    gradientTheme: "from-teal-500/20 via-emerald-500/10 to-obsidian-900",
    accentColor: "#00DF81",
    visualPreview: {
      type: "dashboard",
      accentWord: "EdTech Learning",
      highlightColor: "#00DF81"
    }
  }
];
