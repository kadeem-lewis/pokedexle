import { usePathname } from "next/navigation";

export type GameMode =
  | "classic"
  | "classicUnlimited"
  | "whosthatpokemon"
  | "whosthatpokemonUnlimited";

const modeLookup: Record<string, Record<string, GameMode>> = {
  classic: {
    daily: "classic",
    unlimited: "classicUnlimited",
  },
  whosthatpokemon: {
    daily: "whosthatpokemon",
    unlimited: "whosthatpokemonUnlimited",
  },
};

//TODO: This needs to be stricter but I can't implement that until I refactor routing
export function useGameMode() {
  const currentPath = usePathname();

  const [type, variant] = currentPath.split("/").filter(Boolean);

  const gameVariant = variant === "unlimited" ? "unlimited" : "daily";

  const mode = modeLookup[type]?.[gameVariant] || null;

  const isUnlimited = mode === modeLookup[type]?.unlimited;
  const isDaily = mode === modeLookup[type]?.daily;

  return { mode, isUnlimited, isDaily };
}
