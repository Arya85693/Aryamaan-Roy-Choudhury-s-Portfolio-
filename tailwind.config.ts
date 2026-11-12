import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        // Every color is a CSS variable (RGB channels) set per theme in globals.css.
        // "ink" = surfaces, "paper" = text, "accent" = the theme's highlight color.
        ink: {
          DEFAULT: "rgb(var(--ink-900) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--line-rgb) / var(--line-alpha))",
          strong: "rgb(var(--line-rgb) / var(--line-strong-alpha))",
        },
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          muted: "rgb(var(--paper-muted) / <alpha-value>)",
          dim: "rgb(var(--paper-dim) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          // A readable shade of the accent for text and small marks on the page background.
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        // Second brand color: midnight navy in light mode, soft azure in dark mode.
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          soft: "rgb(var(--secondary-soft) / <alpha-value>)",
        },
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        up: "rgb(var(--up) / <alpha-value>)",
        down: "rgb(var(--down) / <alpha-value>)",
      },
      maxWidth: {
        page: "76rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.2s ease-out both",
        blink: "blink 1.1s steps(1) 5",
      },
    },
  },
  plugins: [],
};

export default config;
