export interface DeliverableItem {
  name: string;
  size: string;
  w: number;
  h: number;
  spec?: string;
}

export interface DeliverableSection {
  name: string;
  items: DeliverableItem[];
}

export interface DeliverableCategory {
  id: string;
  num: string;
  category: string;
  color: string;
  sections: DeliverableSection[];
}

// Brand Deliverables Data — 8 Categories, 150+ Deliverables with Standard Specs
export const DELIVERABLES: DeliverableCategory[] = [
  {
    id: "brand-identity",
    num: "01",
    category: "Complete Brand Identity",
    color: "#7C3AED",
    sections: [
      {
        name: "Advanced Logo System",
        items: [
          { name: "Primary Logo", size: "SVG / 500×500px", w: 1, h: 1, spec: "Min 24px screen / 0.5\" print" },
          { name: "Secondary / Horizontal Logo", size: "SVG / 1500×500px", w: 3, h: 1, spec: "Wide format layouts" },
          { name: "Logo Mark / Icon", size: "500×500px", w: 1, h: 1, spec: "Standalone mark, all sizes" },
          { name: "Monochrome Version", size: "SVG / 500×500px", w: 1, h: 1, spec: "Black & white only" },
          { name: "Logo Construction", size: "A4 / 2480×3508px", w: 210, h: 297, spec: "Grid & proportions guide" },
          { name: "Clear Space", size: "A4 Diagram", w: 210, h: 297, spec: "Minimum clear space rules" },
          { name: "Minimum Size", size: "A4 Diagram", w: 210, h: 297, spec: "24px digital / 0.5\" print" },
          { name: "Logo Placement Rules", size: "A4 / Landscape", w: 297, h: 210, spec: "Placement on backgrounds" },
          { name: "Incorrect Logo Usage", size: "A4 / Landscape", w: 297, h: 210, spec: "Don'ts reference sheet" },
          { name: "Logo Application Examples", size: "1920×1080px", w: 16, h: 9, spec: "Real-world applications" },
        ]
      },
      {
        name: "Complete Color System",
        items: [
          { name: "Primary Colors", size: "A4 Swatch Sheet", w: 210, h: 297, spec: "HEX / RGB / CMYK / Pantone" },
          { name: "Secondary Colors", size: "A4 Swatch Sheet", w: 210, h: 297, spec: "" },
          { name: "Supporting Colors", size: "A4 Swatch Sheet", w: 210, h: 297, spec: "" },
          { name: "Neutral Colors", size: "A4 Swatch Sheet", w: 210, h: 297, spec: "Grays, whites, blacks" },
          { name: "Digital Colors", size: "A4 Reference", w: 210, h: 297, spec: "HEX / RGB / HSL" },
          { name: "Print Colors", size: "A4 Reference", w: 210, h: 297, spec: "CMYK / Pantone" },
          { name: "Color Hierarchy", size: "A4 Infographic", w: 210, h: 297, spec: "Primary → Secondary → Accent" },
        ]
      },
      {
        name: "Complete Typography System",
        items: [
          { name: "Primary Font", size: "A4 Type Sheet", w: 210, h: 297, spec: "Full character set" },
          { name: "Secondary Font", size: "A4 Type Sheet", w: 210, h: 297, spec: "" },
          { name: "Heading Font", size: "A4 Type Sheet", w: 210, h: 297, spec: "H1–H6 scale" },
          { name: "Body Font", size: "A4 Type Sheet", w: 210, h: 297, spec: "Regular / Medium / Bold" },
          { name: "Number / Price Font", size: "A4 Reference", w: 210, h: 297, spec: "Tabular numerals" },
          { name: "Typography Hierarchy", size: "A4 Scale Chart", w: 210, h: 297, spec: "Size / Weight / Leading" },
          { name: "Digital Usage", size: "1920×1080px", w: 16, h: 9, spec: "Web & app typography" },
          { name: "Print Usage", size: "A4 Reference", w: 210, h: 297, spec: "Print-safe sizes" },
        ]
      },
      {
        name: "Graphic Language",
        items: [
          { name: "Brand Shapes", size: "A4 Reference", w: 210, h: 297, spec: "Core geometric shapes" },
          { name: "Lines & Rules", size: "A4 Reference", w: 210, h: 297, spec: "Weight & style guide" },
          { name: "Frames", size: "A4 Reference", w: 210, h: 297, spec: "Border & frame system" },
          { name: "Visual Motifs", size: "A4 Showcase", w: 210, h: 297, spec: "" },
          { name: "Background Elements", size: "1920×1080px", w: 16, h: 9, spec: "" },
          { name: "Brand Pattern", size: "2000×2000px Tile", w: 1, h: 1, spec: "Seamless repeat pattern" },
          { name: "Design Grid", size: "A4 + 1920×1080px", w: 210, h: 297, spec: "12-column grid system" },
          { name: "Layout System", size: "A4 Landscape", w: 297, h: 210, spec: "Composition rules" },
        ]
      },
      {
        name: "Photography Direction",
        items: [
          { name: "Product Photography", size: "1:1 / 4:5 / 16:9", w: 1, h: 1, spec: "1080×1080px min" },
          { name: "Lifestyle Photography", size: "16:9 / 4:5", w: 16, h: 9, spec: "1920×1080px min" },
          { name: "Corporate Photography", size: "16:9 / 1:1", w: 16, h: 9, spec: "" },
          { name: "Model / People Photography", size: "4:5 / 9:16", w: 4, h: 5, spec: "" },
          { name: "Background Direction", size: "A4 Moodboard", w: 210, h: 297, spec: "" },
          { name: "Lighting Direction", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Composition Rules", size: "A4 Reference", w: 210, h: 297, spec: "Rule of thirds, framing" },
          { name: "Image Treatment", size: "A4 Reference", w: 210, h: 297, spec: "Filters, overlays, tones" },
          { name: "Retouching Style", size: "A4 Reference", w: 210, h: 297, spec: "" },
        ]
      },
      {
        name: "Complete Icon System",
        items: [
          { name: "Category Icons", size: "48×48px / 64×64px", w: 1, h: 1, spec: "SVG, all sizes" },
          { name: "Service Icons", size: "48×48px / 64×64px", w: 1, h: 1, spec: "" },
          { name: "Feature Icons", size: "48×48px", w: 1, h: 1, spec: "" },
          { name: "UI Icons", size: "16×16 / 24×24 / 32×32px", w: 1, h: 1, spec: "Outline & filled" },
          { name: "Icon Style Guide", size: "A4 Reference", w: 210, h: 297, spec: "Unified style rules" },
          { name: "Stroke / Fill Rules", size: "A4 Reference", w: 210, h: 297, spec: "Stroke width: 1.5–2px" },
          { name: "Size & Spacing", size: "A4 Reference", w: 210, h: 297, spec: "8px grid system" },
        ]
      },
      {
        name: "Complete Brand Guidelines",
        items: [
          { name: "Logo Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Color Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Typography Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Photography Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Iconography Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Graphic Element Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Social Media Guidelines", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Digital Applications", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Print Applications", size: "A4 Multi-page PDF", w: 210, h: 297, spec: "" },
          { name: "Do's & Don'ts", size: "A4 Landscape", w: 297, h: 210, spec: "" },
          { name: "Brand Application Examples", size: "A4 Landscape", w: 297, h: 210, spec: "" },
        ]
      },
    ]
  },
  {
    id: "digital-ecosystem",
    num: "02",
    category: "Complete Digital Ecosystem",
    color: "#0EA5E9",
    sections: [
      {
        name: "Website Visual System",
        items: [
          { name: "Homepage Visual Language", size: "1920×1080px", w: 16, h: 9, spec: "Full-width layout" },
          { name: "Hero Banner", size: "1920×900px", w: 64, h: 30, spec: "Desktop hero section" },
          { name: "Category / Service Banner", size: "1200×400px", w: 3, h: 1, spec: "" },
          { name: "Product / Service Card", size: "800×800px", w: 1, h: 1, spec: "Square card format" },
          { name: "CTA / Button System", size: "A4 Reference", w: 210, h: 297, spec: "All states & sizes" },
          { name: "Badge System", size: "A4 Reference", w: 210, h: 297, spec: "Labels, tags, badges" },
          { name: "Promotional Banner", size: "1920×500px", w: 192, h: 50, spec: "" },
          { name: "Popup Design", size: "800×600px", w: 4, h: 3, spec: "" },
          { name: "Category Icons", size: "64×64px", w: 1, h: 1, spec: "" },
          { name: "Website Typography", size: "A4 Reference", w: 210, h: 297, spec: "Web-safe font system" },
          { name: "Website Color Usage", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Mobile Visual System", size: "390×844px", w: 9, h: 19, spec: "iPhone 14 base size" },
        ]
      },
      {
        name: "Product / Service Visual System",
        items: [
          { name: "Product Photography Style", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Service Photography Style", size: "1920×1080px", w: 16, h: 9, spec: "" },
          { name: "Product / Service Background", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Image Composition", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Image Cropping", size: "A4 Reference", w: 210, h: 297, spec: "Crop rules per platform" },
          { name: "Image Treatment", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Promotional Visual Style", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Category-wise Visual Direction", size: "A4 Moodboard", w: 210, h: 297, spec: "" },
        ]
      },
    ]
  },
  {
    id: "social-media",
    num: "03",
    category: "Complete Social Media System",
    color: "#EC4899",
    sections: [
      {
        name: "Platform Branding — Profile + Cover",
        items: [
          { name: "LinkedIn Profile", size: "400×400px", w: 1, h: 1, spec: "Cover: 1584×396px" },
          { name: "Facebook Profile + Cover", size: "170×170px + 820×312px", w: 820, h: 312, spec: "" },
          { name: "Instagram Profile", size: "110×110px (displays 320×320)", w: 1, h: 1, spec: "Post: 1080×1080px" },
          { name: "YouTube", size: "800×800px + 2560×1440px", w: 16, h: 9, spec: "Thumbnail: 1280×720px" },
          { name: "Twitter / X", size: "400×400px + 1500×500px", w: 3, h: 1, spec: "" },
          { name: "TikTok", size: "200×200px", w: 1, h: 1, spec: "Video: 1080×1920px" },
          { name: "Google Business Profile", size: "720×720px + 1080×608px", w: 16, h: 9, spec: "" },
          { name: "WhatsApp", size: "500×500px", w: 1, h: 1, spec: "Business profile" },
          { name: "Threads", size: "400×400px", w: 1, h: 1, spec: "" },
          { name: "Pinterest", size: "165×165px + 800×450px", w: 16, h: 9, spec: "Pin: 1000×1500px" },
          { name: "Snapchat", size: "320×320px", w: 1, h: 1, spec: "" },
        ]
      },
      {
        name: "Social Content System",
        items: [
          { name: "Product / Service Post", size: "1080×1080px", w: 1, h: 1, spec: "Square format" },
          { name: "Educational Post", size: "1080×1080px / 1080×1350px", w: 4, h: 5, spec: "" },
          { name: "Promotional Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Offer Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "New Launch", size: "1080×1080px / 1080×1920px", w: 9, h: 16, spec: "" },
          { name: "Featured Product / Service", size: "1080×1350px", w: 4, h: 5, spec: "Portrait format" },
          { name: "Customer Review", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Testimonial", size: "1080×1080px / 1080×1350px", w: 4, h: 5, spec: "" },
          { name: "Corporate Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Informational Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Festival Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Campaign Post", size: "1080×1080px / 1080×1920px", w: 9, h: 16, spec: "" },
          { name: "Recruitment Post", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Story Template", size: "1080×1920px", w: 9, h: 16, spec: "Vertical 9:16" },
          { name: "Reel Cover", size: "1080×1920px", w: 9, h: 16, spec: "Thumbnail: 1080×608px" },
          { name: "Highlight Cover", size: "1080×1920px → 161×161px", w: 1, h: 1, spec: "Circle crop" },
        ]
      },
    ]
  },
  {
    id: "campaign",
    num: "04",
    category: "Campaign Branding System",
    color: "#F97316",
    sections: [
      {
        name: "Campaign Development",
        items: [
          { name: "Campaign Concept", size: "A4 / Presentation 16:9", w: 16, h: 9, spec: "" },
          { name: "Campaign Key Visual", size: "1920×1080px", w: 16, h: 9, spec: "Master KV" },
          { name: "Campaign Logo / Lockup", size: "SVG / 500×500px", w: 1, h: 1, spec: "" },
          { name: "Campaign Color Direction", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Campaign Typography", size: "A4 Reference", w: 210, h: 297, spec: "" },
          { name: "Campaign Layout", size: "A4 / 1920×1080px", w: 16, h: 9, spec: "" },
          { name: "Hero Creative", size: "1920×1080px", w: 16, h: 9, spec: "" },
          { name: "Product / Service Creative", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Offer Creative", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Website Banner", size: "1920×600px", w: 32, h: 10, spec: "" },
          { name: "Social Media Creative", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Story Creative", size: "1080×1920px", w: 9, h: 16, spec: "" },
          { name: "Reel Creative", size: "1080×1920px", w: 9, h: 16, spec: "15–60s" },
          { name: "Campaign Thumbnail", size: "1280×720px", w: 16, h: 9, spec: "" },
          { name: "Offline Adaptation", size: "A1 / A2 / Billboard", w: 16, h: 9, spec: "300 DPI for print" },
        ]
      },
      {
        name: "Campaign Types",
        items: [
          { name: "Seasonal Campaign", size: "1080×1080px + Story", w: 1, h: 1, spec: "" },
          { name: "Festival Campaign", size: "1080×1080px + Story", w: 1, h: 1, spec: "" },
          { name: "Product Launch", size: "1920×1080px + Social", w: 16, h: 9, spec: "" },
          { name: "Service Launch", size: "1920×1080px + Social", w: 16, h: 9, spec: "" },
          { name: "Anniversary Campaign", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Promotional Campaign", size: "1080×1080px + Banner", w: 1, h: 1, spec: "" },
          { name: "Awareness Campaign", size: "1920×1080px", w: 16, h: 9, spec: "" },
          { name: "Sales Campaign", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "Special Offer Campaign", size: "1080×1080px + Story", w: 1, h: 1, spec: "" },
        ]
      },
    ]
  },
  {
    id: "performance-marketing",
    num: "05",
    category: "Performance Marketing Creative System",
    color: "#EF4444",
    sections: [
      {
        name: "Ad Creative Formats",
        items: [
          { name: "Static Ads", size: "1200×628px / 1080×1080px", w: 1200, h: 628, spec: "Facebook / Google" },
          { name: "Carousel Ads", size: "1080×1080px (per slide)", w: 1, h: 1, spec: "Min 2, max 10 slides" },
          { name: "Collection Ads", size: "1200×628px cover + 1:1 items", w: 16, h: 9, spec: "" },
          { name: "Product / Service Ads", size: "1080×1080px / 1200×628px", w: 1, h: 1, spec: "" },
          { name: "Offer Ads", size: "1080×1080px", w: 1, h: 1, spec: "" },
          { name: "UGC Ad Style", size: "1080×1920px", w: 9, h: 16, spec: "Vertical, organic feel" },
          { name: "Testimonial Ads", size: "1080×1080px / 1080×1920px", w: 1, h: 1, spec: "" },
          { name: "Problem / Solution Ads", size: "1080×1080px / 1200×628px", w: 1, h: 1, spec: "" },
          { name: "Awareness Ads", size: "1920×1080px / 1080×1080px", w: 16, h: 9, spec: "Top of funnel" },
          { name: "Consideration Ads", size: "1080×1080px", w: 1, h: 1, spec: "Mid funnel" },
          { name: "Conversion Ads", size: "1080×1080px / 1200×628px", w: 1, h: 1, spec: "Bottom of funnel" },
          { name: "Retargeting Ads", size: "1080×1080px / 300×250px", w: 1, h: 1, spec: "" },
          { name: "Ad Thumbnail System", size: "1280×720px", w: 16, h: 9, spec: "" },
          { name: "Creative Testing Variations", size: "1080×1080px ×3–5", w: 1, h: 1, spec: "A/B test sets" },
        ]
      },
    ]
  },
  {
    id: "motion",
    num: "06",
    category: "Motion Branding",
    color: "#8B5CF6",
    sections: [
      {
        name: "Motion Assets",
        items: [
          { name: "Logo Animation", size: "1080×1080px / 1920×1080px", w: 1, h: 1, spec: "3–5s, MP4 + GIF" },
          { name: "Product / Service Reveal", size: "1080×1080px / 1920×1080px", w: 16, h: 9, spec: "5–15s" },
          { name: "Promotional Animation", size: "1080×1080px", w: 1, h: 1, spec: "10–30s" },
          { name: "Typography Animation", size: "1080×1080px / 1920×1080px", w: 1, h: 1, spec: "" },
          { name: "Social Reel Intro", size: "1080×1920px", w: 9, h: 16, spec: "3–5s" },
          { name: "Reel Outro / End Card", size: "1080×1920px", w: 9, h: 16, spec: "5–10s with CTA" },
          { name: "Campaign Motion", size: "1920×1080px", w: 16, h: 9, spec: "15–60s" },
          { name: "Product / Service Motion", size: "1080×1080px", w: 1, h: 1, spec: "15–30s" },
          { name: "Story Motion", size: "1080×1920px", w: 9, h: 16, spec: "15s max" },
          { name: "Transition System", size: "A4 Reference", w: 210, h: 297, spec: "Timing & easing guide" },
        ]
      },
    ]
  },
  {
    id: "physical-brand",
    num: "07",
    category: "Physical Brand Experience",
    color: "#10B981",
    sections: [
      {
        name: "Packaging",
        items: [
          { name: "Product Box", size: "Varies (dieline)", w: 3, h: 2, spec: "300 DPI, CMYK" },
          { name: "Courier / Delivery Box", size: "Custom dieline", w: 4, h: 3, spec: "" },
          { name: "Product Sticker", size: "5×5cm / 7×5cm", w: 1, h: 1, spec: "Die-cut options" },
          { name: "Shipping Label", size: "10×15cm", w: 2, h: 3, spec: "300 DPI, CMYK" },
          { name: "Tissue Paper", size: "50×70cm / 75×100cm", w: 3, h: 4, spec: "" },
          { name: "Packaging Tape", size: "48mm × 50m roll", w: 10, h: 1, spec: "" },
          { name: "Promotional Insert", size: "A5 / 148×210mm", w: 148, h: 210, spec: "Inside package" },
          { name: "Seasonal Packaging", size: "Custom dieline", w: 3, h: 4, spec: "" },
        ]
      },
      {
        name: "Customer Materials",
        items: [
          { name: "Thank You Card", size: "A6 / 105×148mm", w: 105, h: 148, spec: "300 DPI, CMYK" },
          { name: "Order / Service Card", size: "A6 / 148×105mm", w: 148, h: 105, spec: "" },
          { name: "Review Request Card", size: "A6 / 105×148mm", w: 105, h: 148, spec: "" },
          { name: "Discount Card", size: "85.6×54mm", w: 85.6, h: 54, spec: "Credit card size" },
          { name: "Promotional Card", size: "A6 / 148×105mm", w: 148, h: 105, spec: "" },
          { name: "Referral Card", size: "85.6×54mm", w: 85.6, h: 54, spec: "" },
          { name: "Product / Service Info Card", size: "A5 / 148×210mm", w: 148, h: 210, spec: "" },
          { name: "Gift Voucher", size: "210×99mm DL", w: 210, h: 99, spec: "" },
        ]
      },
      {
        name: "Retail / Physical Branding",
        items: [
          { name: "Shopping Bag", size: "A4 / A3 (dieline)", w: 3, h: 4, spec: "300 DPI" },
          { name: "Store Signboard", size: "Custom (90×60cm base)", w: 3, h: 2, spec: "" },
          { name: "Counter Branding", size: "Custom panel", w: 16, h: 9, spec: "" },
          { name: "Product Display", size: "Custom", w: 3, h: 4, spec: "" },
          { name: "Standee", size: "60×160cm", w: 60, h: 160, spec: "Retractable or foam" },
          { name: "Roll-up Banner", size: "85×200cm / 100×200cm", w: 85, h: 200, spec: "300 DPI" },
          { name: "Poster", size: "A1 / A2 / 60×90cm", w: 60, h: 90, spec: "300 DPI, CMYK" },
          { name: "Glass Sticker", size: "Custom (vinyl print)", w: 16, h: 9, spec: "" },
          { name: "Shelf Talker", size: "A5 / A6 landscape", w: 148, h: 105, spec: "" },
          { name: "Display Card", size: "A5 / A6", w: 148, h: 105, spec: "" },
          { name: "Event Branding", size: "Custom (site-specific)", w: 16, h: 9, spec: "Backdrop / Signage" },
        ]
      },
    ]
  },
  {
    id: "corporate",
    num: "08",
    category: "Corporate Branding",
    color: "#06B6D4",
    sections: [
      {
        name: "Corporate Stationery",
        items: [
          { name: "Business Card", size: "85.6×54mm / 3.5\"×2\"", w: 85.6, h: 54, spec: "300 DPI, CMYK, bleed 3mm" },
          { name: "Letterhead", size: "A4 / 210×297mm", w: 210, h: 297, spec: "300 DPI print-ready" },
          { name: "Envelope", size: "DL 220×110mm / C5 229×162mm", w: 220, h: 110, spec: "" },
          { name: "Invoice", size: "A4 / 210×297mm", w: 210, h: 297, spec: "Word / Google Docs" },
          { name: "Quotation", size: "A4 / 210×297mm", w: 210, h: 297, spec: "" },
          { name: "Company Profile", size: "A4 / 210×297mm (multi-page)", w: 210, h: 297, spec: "PDF, 8–24 pages" },
          { name: "Presentation Template", size: "1920×1080px (16:9)", w: 16, h: 9, spec: "PowerPoint / Keynote" },
          { name: "Email Signature", size: "600×200px max", w: 3, h: 1, spec: "HTML + PNG fallback" },
          { name: "Employee ID Card", size: "85.6×54mm (CR80)", w: 85.6, h: 54, spec: "300 DPI, front & back" },
          { name: "Certificate", size: "A4 Landscape / 297×210mm", w: 297, h: 210, spec: "" },
          { name: "Corporate Folder", size: "A4 (dieline: 467×307mm)", w: 467, h: 307, spec: "" },
          { name: "Official Document Template", size: "A4 / 210×297mm", w: 210, h: 297, spec: "" },
        ]
      },
    ]
  },
];
