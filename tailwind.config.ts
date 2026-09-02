import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hemisphere-aware tokens. These read from CSS variables so a single
        // `data-lens` attribute re-skins an entire subtree.
        surface: "rgb(var(--bg) / <alpha-value>)",
        "surface-raised": "rgb(var(--bg-raised) / <alpha-value>)",
        ink: "rgb(var(--text) / <alpha-value>)",
        "ink-muted": "rgb(var(--text-muted) / <alpha-value>)",
        "ink-faint": "rgb(var(--text-faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        edge: "rgb(var(--edge) / <alpha-value>)",

        // Absolute hemisphere palettes, for when both must coexist on screen
        // (the landing split, the lens toggle).
        // One extra step between neutral-900 and neutral-800, for hover states.
        neutral: { 850: "#1e1e1e" },

        architect: {
          bg: "#0a0a0a", // neutral-950
          raised: "#171717", // neutral-900
          text: "#fafafa", // neutral-50
          muted: "#a3a3a3", // neutral-400
          accent: "#7aa2c4",
          edge: "#262626", // neutral-800
        },
        observer: {
          bg: "#0a0a0a",
          raised: "#171717",
          text: "#fafafa",
          muted: "#a3a3a3",
          accent: "#c99a4e",
          edge: "#262626",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        brutal: "0.34em",
        wider2: "0.18em",
      },
      maxWidth: {
        measure: "68ch",
        schematic: "78ch",
      },
      transitionTimingFunction: {
        synapse: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "grid-drift": {
          "0%": { backgroundPosition: "0px 0px, 0px 0px" },
          "100%": { backgroundPosition: "40px 40px, 40px 40px" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "grid-drift": "grid-drift 24s linear infinite",
        breathe: "breathe 9s ease-in-out infinite",
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [typography],
};

export default config;
