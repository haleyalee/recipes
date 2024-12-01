import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "green": "#B3B07E",
        "linkGreen": "#8C884B",
        "hoverGreen": "#5E5A23"
      },
      cursor: {
        "custom": "url(/oven-mitt.png), auto"
      }
    }
  },
  plugins: [],
} satisfies Config;
