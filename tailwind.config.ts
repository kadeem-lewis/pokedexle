import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pokemon-ds": ["var(--font-pokemon-ds)"],
      },
      boxShadow: {
        "border-1": "0 0 0 4px aqua, 0 0 0 10px black",
        "border-2": "0 0 0 4px red, 0 0 0 10px blue",
        "border-3": "0 0 0 4px red, 0 0 0 10px blue",
      },
    },
  },

  darkMode: "class",
  plugins: [],
} satisfies Config;
