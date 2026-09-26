import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#040608",
          900: "#080B0F",
          850: "#0E131A",
          800: "#131B24",
          700: "#1B2533",
          600: "#243245",
        },
        emerald: {
          neon: "#00FF87",
          glow: "#30FF97",
          bright: "#10B981",
          deep: "#059669",
          dark: "#064E3B",
        },
        card: {
          bg: "#0B0F15",
          border: "rgba(255, 255, 255, 0.08)",
          hoverBorder: "rgba(48, 255, 151, 0.35)",
        },
      },
      fontFamily: {
        bengali: ["var(--font-bengali)", "Hind Siliguri", "sans-serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "emerald-glow": "0 0 40px -10px rgba(48, 255, 151, 0.28)",
        "emerald-glow-lg": "0 0 60px -15px rgba(48, 255, 151, 0.4)",
        "emerald-glow-sm": "0 0 20px -5px rgba(48, 255, 151, 0.25)",
        "dock-glow": "0 10px 40px -5px rgba(0, 0, 0, 0.8), 0 0 30px 2px rgba(48, 255, 151, 0.15)",
        "card-subtle": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-rotate": "rotate-gradient 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
      },
      keyframes: {
        "rotate-gradient": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
