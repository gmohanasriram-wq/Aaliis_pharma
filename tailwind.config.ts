import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            50: "#f0f5fa",
            100: "#dbe7f4",
            200: "#b8d2eb",
            300: "#86b3dc",
            400: "#4f8fc8",
            500: "#2d72b2",
            600: "#1f5892",
            700: "#1a4676",
            800: "#183c63",
            900: "#0f2c59",
            950: "#0a1b37",
          },
          teal: {
            50: "#f0fdfa",
            100: "#ccfbf1",
            200: "#99f6e4",
            300: "#5eead4",
            400: "#2dd4bf",
            500: "#14b8a6",
            600: "#0d9488",
            700: "#0f766e",
            800: "#115e59",
            900: "#134e4a",
          },
          forest: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#16a34a",
            600: "#15803d",
            700: "#008751",
            800: "#006838",
            900: "#006039",
            950: "#023e24",
          },
          cyan: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9",
            600: "#00a4e4",
            700: "#02749d",
            800: "#0369a1",
            900: "#075985",
            950: "#082f49",
          },
        },
      },
      screens: {
        xs: "420px",
      },
      fontFamily: {
        // Inter is loaded via next/font/google in app/layout.tsx and exposed as
        // --font-inter. The previous stack interpolated a complete --font-sans
        // stack from globals.css and then repeated it, which both doubled the
        // declaration and let a system font win over Inter. This is a single
        // stack led by the self-hosted face.
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        // Previously implicit (Tailwind's default). Declared here so the
        // dossier's licence-code voice is a deliberate choice: a system stack,
        // deliberately not a second loaded webfont.
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Liberation Mono'",
          "'Courier New'",
          "monospace",
        ],
      },
      fontSize: {
        // The dossier's licence-code and metadata register. These shipped as
        // text-[10px] and text-[11px] at roughly 38 call sites; naming the two
        // steps stops the arbitrary values.
        //
        // No lineHeight is set, deliberately: text-[10px] sets font-size only
        // and lets line-height inherit, so adding one here would silently
        // re-space every metadata row on the site.
        micro: "0.625rem",
        "micro-lg": "0.6875rem",
      },
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "2xs": "0 1px 1px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
