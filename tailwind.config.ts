import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        medix: {
          blue: "#2563EB",
          navy: "#0F172A",
          "navy-light": "#1E293B",
          "navy-dark": "#020617",
          accent: "#38BDF8",
          surface: "#1E293B",
          surfaceHover: "#334155",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
