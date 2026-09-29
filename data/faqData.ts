export interface FAQItem {
  question: string;
  answer: string;
  category: "Services & Scope" | "Process & Delivery" | "Pricing & Terms" | "Support";
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: "Services & Scope",
    question: "Why choose Qllix over hiring multiple separate freelancers or agencies?",
    answer: "When brand identity, web development, and performance advertising are built in silos, brand consistency breaks, website performance tanks, and ad spend is wasted. Qllix unites all three disciplines under one unified squad—pairing your visual brand with sub-second Next.js web applications directly wired into high-converting sales funnels."
  },
  {
    category: "Process & Delivery",
    question: "How fast can we launch our new website or brand identity?",
    answer: "Brand identity sprints are typically delivered within 7–10 business days. Custom Next.js or Webflow platforms take 2–3 weeks from wireframe to production deployment. For our comprehensive 3-in-1 Full Growth Bundle, we go from concept to live revenue-generating launch in 4–5 weeks."
  },
  {
    category: "Process & Delivery",
    question: "How do you handle day-to-day communication and project tracking?",
    answer: "We establish a private, dedicated Slack connect channel with your core team, send asynchronous Loom video walkthroughs at every milestone, and host weekly strategy huddles. Zero unnecessary email ping-pong or agency bureaucracy."
  },
  {
    category: "Pricing & Terms",
    question: "What are your payment milestones and terms?",
    answer: "Project sprints require a 50% initial deposit to reserve your dedicated production squad, with the remaining 50% settled upon final sign-off and production deployment. Ongoing growth retainers are billed on transparent 30-day cycles with no locked annual contracts."
  },
  {
    category: "Services & Scope",
    question: "Do you build primarily with Next.js or Webflow?",
    answer: "We excel in both. For content-heavy marketing sites requiring non-technical editorial freedom, Webflow is outstanding. For ultra-fast custom platforms, SaaS dashboards, complex data flows, and fluid micro-animations, we build natively in Next.js 14, React, and Tailwind CSS."
  },
  {
    category: "Support",
    question: "What post-launch support and warranty do you provide?",
    answer: "Every website launch includes 30 days of comprehensive post-launch warranty, bug-fixing, analytics verification, and team training. You can also seamlessly transition into our ongoing Growth Retainer for continuous conversion rate optimization (CRO), feature updates, and performance ad scaling."
  }
];
