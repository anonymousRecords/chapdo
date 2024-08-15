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
        light: "#FFFF00", // 밝은 노란색
        DEFAULT: "#FFD700", // 기본 노란색
        dark: "#FFA500", // 어두운 노란색
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
