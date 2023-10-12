import React from "react";
import { TypeBadge } from "../ui/TypeBadge";
import { useAtomValue } from "jotai";
import {
  currentGameMode,
  guessedItemsAtom,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";

export type PokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy";

export const TYPES: PokemonType[] = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

export default function PokemonTypes() {
  const mode = useAtomValue(currentGameMode);
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  //if the type isnt in the correct answer but it was guess disable it
  //if the type is in the guessed items array and in the correct answer then highlight it
  const getTypeEffect = (
    type: PokemonType,
  ): "highlighted" | "disabled" | "default" => {
    if (guessedItems.length) {
      if (
        guessedItems.some(
          (item) =>
            item.types.includes(type) && pokemonToGuess?.types.includes(type),
        )
      ) {
        return "highlighted";
      }
      if (
        guessedItems.some(
          (item) =>
            item.types.includes(type) && !pokemonToGuess?.types.includes(type),
        )
      ) {
        return "disabled";
      }
    }
    return "default";
  };

  return (
    <div className="grid grid-cols-6 gap-1">
      {TYPES.map((type) => (
        <TypeBadge
          key={type}
          type={type}
          className="col-span-1 text-base  text-white md:text-lg"
          effect={getTypeEffect(type)}
        >
          {type}
        </TypeBadge>
      ))}
    </div>
  );
}
