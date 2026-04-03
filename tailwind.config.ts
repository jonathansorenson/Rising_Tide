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
        "slate-dark": "#3B4F5C",
        sage: "#8FB5B2",
        "sage-dark": "#7BA3A8",
        "warm-gold": "#D4A574",
        copper: "#D4A574",
        "gold-muted": "#C0A07E",
        cream: "#F2EDE6",
        white: "#FFFFFF",
        "text-dark": "#3B4F5C",
        "teal-deep": "#6B97A0",
        navy: "#0f1923",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "'Times New Roman'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
