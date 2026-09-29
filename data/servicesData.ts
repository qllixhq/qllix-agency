export interface SubService {
  title: string;
  desc: string;
  iconName: string;
}

export interface ServicePillar {
  id: string;
  tag: string;
  number: string;
  title: string;
  shortDesc: string;
  headline: string;
  valueProp: string;
  heroStat: { value: string; label: string };
  deliverables: string[];
  subServices: SubService[];
  techStack: string[];
  gradient: string;
  accentColor: string;
  visualType: "branding" | "web" | "marketing";
}

export const SERVICES_DATA: ServicePillar[] = [
  {
    id: "graphic-design",
    number: "01",
    tag: "Visual Identity",
    title: "Brand & Graphic Design",
    shortDesc: "Iconic logos, complete visual identity systems, and premium brand assets that position your company at the apex of its industry.",
    headline: "Unforgettable brand visuals engineered to turn first glances into lifelong brand advocates.",
    valueProp: "We don't just design eye candy; we build cohesive visual design systems that inspire unwavering customer trust and prestige.",
    heroStat: { value: "100%", label: "Custom Vector & Brand Asset Quality" },
    deliverables: [
      "Complete Brand Strategy & Market Positioning",
      "Adaptive Logo System & Curated Typography",
      "Comprehensive Brand Guidelines & Style Manual",
      "High-Converting Social Media Creative Templates",
      "Packaging & Production-Ready Print Files",
      "Investor Pitch Decks & Sales Keynotes"
    ],
    subServices: [
      {
        title: "Brand Strategy & Identity",
        desc: "Market positioning, color psychology, and tone of voice that establish authentic brand resonance.",
        iconName: "Palette"
      },
      {
        title: "Logo Systems & Guidelines",
        desc: "Precision vector logo marks across all breakpoints with detailed usage rulebooks.",
        iconName: "Sparkles"
      },
      {
        title: "Social & Marketing Creatives",
        desc: "Scroll-stopping social ad creatives, display banners, and product launch kits.",
        iconName: "Layers"
      },
      {
        title: "Pitch Decks & Presentations",
        desc: "C-suite institutional decks tailored to secure enterprise deals and investor funding.",
        iconName: "Presentation"
      }
    ],
    techStack: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Blender"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#00FF87",
    visualType: "branding"
  },
  {
    id: "web-design",
    number: "02",
    tag: "Conversion Engine",
    title: "Web Design & Development",
    shortDesc: "Ultra-fast Next.js 14 and Webflow web platforms engineered for peak user experience and industry-leading conversion rates.",
    headline: "High-performance digital flagships that convert inbound visitors into high-ticket sales pipeline.",
    valueProp: "Your website is your 24/7 rainmaker. We engineer modern interactive micro-animations with 99+ Core Web Vitals speed.",
    heroStat: { value: "0.38s", label: "Average Global Page Load Time" },
    deliverables: [
      "UI/UX Architecture & Figma Design Systems",
      "Next.js 14 / React / Webflow Production Codebase",
      "High-Converting Landing Pages & Funnels",
      "Interactive SaaS Web Apps & Custom Dashboards",
      "Mobile-First Responsive Adaptive Layouts",
      "Built-in Technical SEO & Rich Schema Markup"
    ],
    subServices: [
      {
        title: "UI/UX Interface Design",
        desc: "User journey mapping, wireframing, and pixel-perfect interactive design systems.",
        iconName: "Layout"
      },
      {
        title: "Full-Stack Web Engineering",
        desc: "Clean Next.js, React, and Tailwind CSS architecture built for speed and effortless scalability.",
        iconName: "Code2"
      },
      {
        title: "SaaS Dashboards & Portals",
        desc: "Transforming complex datasets into intuitive, visually breathtaking dashboards.",
        iconName: "Laptop"
      },
      {
        title: "Speed & SEO Optimization",
        desc: "Sub-second load times, 100/100 Lighthouse performance, and structured search data.",
        iconName: "Zap"
      }
    ],
    techStack: ["Next.js 14", "React", "Tailwind CSS", "TypeScript", "Webflow", "Framer Motion"],
    gradient: "from-cyan-500/20 via-emerald-500/10 to-transparent",
    accentColor: "#00FF87",
    visualType: "web"
  },
  {
    id: "digital-marketing",
    number: "03",
    tag: "Revenue Acceleration",
    title: "Digital Marketing & Growth",
    shortDesc: "Data-driven performance media buying, search authority, and CRO that scale revenues predictably.",
    headline: "Scalable customer acquisition pipelines that transform ad spend into profitable enterprise revenue.",
    valueProp: "Traffic without conversion is vanity. We combine laser-targeted media buying, relentless creative iteration, and funnel CRO.",
    heroStat: { value: "4.4x", label: "Average Client Blended ROAS" },
    deliverables: [
      "Meta (FB/IG) & Google Search / Display Media Buying",
      "Conversion Rate Optimization (CRO) Full Audits",
      "Organic Technical & Content SEO Authority Strategy",
      "Full-Funnel Retargeting & Automated Lifecycle Email",
      "Creative Scripting & High-Impact Ad Variations",
      "Live 24/7 Executive Performance Dashboards"
    ],
    subServices: [
      {
        title: "Paid Media Acquisition",
        desc: "High-ROI Meta & Google campaigns that drive customer acquisition at profitable CAC.",
        iconName: "Target"
      },
      {
        title: "Conversion Optimization (CRO)",
        desc: "Heatmap analysis, multivariate A/B testing, and friction elimination across funnels.",
        iconName: "TrendingUp"
      },
      {
        title: "Search Authority (SEO)",
        desc: "High-intent keyword dominance, technical SEO audits, and premium backlink equity.",
        iconName: "Search"
      },
      {
        title: "Analytics & Funnel Tracking",
        desc: "Server-side CAPI tracking, custom GA4 architectures, and real-time KPI visibility.",
        iconName: "BarChart3"
      }
    ],
    techStack: ["Meta Ads Manager", "Google Ads", "Google Analytics 4", "Semrush", "Hotjar", "Klaviyo"],
    gradient: "from-emerald-400/20 via-blue-500/10 to-transparent",
    accentColor: "#00FF87",
    visualType: "marketing"
  }
];
