import type { Config } from "prettier";
const config: Config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["cva", "cx", "tv"],
};

export default config;