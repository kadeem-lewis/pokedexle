import type { Config } from "tailwindcss";
export default {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pokemon-ds": ["var(--font-pokemon-ds)"],
      },
      colors: {
        normal: {
          100: "#C6C6A7",
          200: "#A8A878",
          300: "#6D6D4E",
        },
        fire: {
          100: "#F5AC78",
          200: "#F08030",
          300: "#9C531F",
        },
        water: {
          100: "#9DB7F5",
          200: "#6890F0",
          300: "#445E9C",
        },
        grass: {
          100: "#A7DB8D",
          200: "#78C850",
          300: "#4E8234",
        },
        electric: {
          100: "#FAE078",
          200: "#F8D030",
          300: "#A1871F",
        },
        ice: {
          100: "#BCE6E6",
          200: "#98D8D8",
          300: "#638D8D",
        },
        fighting: {
          100: "#D67873",
          200: "#C03028",
          300: "#7D1F1A",
        },
        poison: {
          100: "#C183C1",
          200: "#A040A0",
          300: "#682A68",
        },
        ground: {
          100: "#EBD69D",
          200: "#E0C068",
          300: "#927D44",
        },
        flying: {
          100: "#C6B7F5",
          200: "#A890F0",
          300: "#6D5E9C",
        },
        psychic: {
          100: "#FA92B2",
          200: "#F85888",
          300: "#A13959",
        },
        bug: {
          100: "#C6D16E",
          200: "#A8B820",
          300: "#6D7815",
        },
        rock: {
          100: "#D1C17D",
          200: "#B8A038",
          300: "#786824",
        },
        ghost: {
          100: "#A292BC",
          200: "#705898",
          300: "#493963",
        },
        dark: {
          100: "#A29288",
          200: "#705848",
          300: "#49392F",
        },
        dragon: {
          100: "#A27DFA",
          200: "#7038F8",
          300: "#4924A1",
        },
        steel: {
          100: "#D1D1E0",
          200: "#B8B8D0",
          300: "#787887",
        },
        fairy: {
          100: "#F4BDC9",
          200: "#EE99AC",
          300: "#9B6470",
        },
      },
    },
  },

  darkMode: "class",
  plugins: [require("@headlessui/tailwindcss")],
} satisfies Config;
