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
        "slate-dark": "#4A5D5E",
        sage: "#A8C5B8",
        "sage-dark": "#6B8F7B",
        "warm-gold": "#D4A574",
        copper: "#D4A574",
        cream: "#F5F0E8",
        white: "#FFFFFF",
        "text-dark": "#2C3E3F",
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
