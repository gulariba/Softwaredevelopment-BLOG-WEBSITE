import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a5bbfc",
          400: "#8098f9",
          500: "#6172f3",
          600: "#444ce7",
          700: "#3538cd",
          800: "#2d31a6",
          900: "#2d3282",
          950: "#1f2060",
        },
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.zinc.700"),
            a: { color: theme("colors.brand.600"), textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            "h1,h2,h3,h4": { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", color: theme("colors.zinc.900") },
            code: { backgroundColor: theme("colors.zinc.100"), padding: "0.2em 0.4em", borderRadius: "4px", fontSize: "0.875em" },
            "code::before": { content: '""' },
            "code::after":  { content: '""' },
          },
        },
        invert: {
          css: {
            color: theme("colors.zinc.300"),
            a: { color: theme("colors.brand.400") },
            "h1,h2,h3,h4": { color: theme("colors.zinc.100") },
            code: { backgroundColor: theme("colors.zinc.800") },
          },
        },
      }),
      animation: {
        "fade-in":     "fadeIn 0.5s ease-in-out",
        "slide-up":    "slideUp 0.5s ease-out",
        "slide-down":  "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" },                    "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
