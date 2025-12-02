import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // scan all React/TSX files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // modern font
      },
      colors: {
        primary: "#4F46E5",   // Indigo
        secondary: "#10B981", // Emerald
        accent: "#F59E0B",    // Amber
        dark: "#111827",      // Dark gray
        light: "#F9FAFB"      // Light gray
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)", // subtle card shadow
      }
    }
  },
  plugins: []
};

export default config;
