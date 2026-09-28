export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  highlight: string;
  serviceUsed: string;
  resultsMetric: string;
  rating: number;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Alexander Vance",
    role: "Founder & CEO",
    company: "NovaPay Global",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "Qllix completely reimagined our digital infrastructure. Within 60 days of launching the new Next.js web application, checkout conversions doubled and enterprise customer trust surged dramatically.",
    highlight: "Doubled checkout conversion rates in under 60 days",
    serviceUsed: "Web Design & UI/UX",
    resultsMetric: "+210% Conversion Growth",
    rating: 5
  },
  {
    id: "t2",
    name: "Elena Rostova",
    role: "Head of Brand Marketing",
    company: "Aura Organics London",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    quote: "Their branding team delivered work rivaling London's top Mayfair design houses. The packaging and visual identity system they built unlocked immediate shelf placement in luxury department stores.",
    highlight: "Exceptional visual craft that unlocked luxury retail deals",
    serviceUsed: "Brand & Graphic Design",
    resultsMetric: "3.4x Retail Expansion",
    rating: 5
  },
  {
    id: "t3",
    name: "Marcus Thorne",
    role: "Chief Growth Officer",
    company: "HyperScale Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "Most marketing agencies burn budgets on uninspired creative. Qllix engineered an automated performance machine that cut our acquisition cost by 42% while sustaining a 4.8x ROAS at scale.",
    highlight: "Cut CAC by 42% while generating a 4.8x paid ROAS",
    serviceUsed: "Digital Marketing & CRO",
    resultsMetric: "4.8x Sustained Paid ROAS",
    rating: 5
  },
  {
    id: "t4",
    name: "Dr. Samantha Reed",
    role: "Co-Founder & COO",
    company: "Lumina Telehealth",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "Working with Qllix was remarkable. They conceptualized and shipped our complete brand identity and HIPAA-compliant patient booking portal in just 3 weeks with zero compromises on quality.",
    highlight: "Shipped complete rebranding and web app in 3 weeks",
    serviceUsed: "Brand Identity + Web Platform",
    resultsMetric: "+320% Online Bookings",
    rating: 5
  }
];

export const TRUSTED_COMPANIES = [
  { name: "NovaPay", category: "FinTech" },
  { name: "Aura Organics", category: "Luxury DTC" },
  { name: "HyperScale", category: "B2B Cloud" },
  { name: "Zenith AI", category: "Artificial Intelligence" },
  { name: "Vortex Athletics", category: "Apparel" },
  { name: "Lumina Health", category: "HealthTech" },
  { name: "Optima Labs", category: "BioTech" },
  { name: "Apex Protocol", category: "Web3" }
];
