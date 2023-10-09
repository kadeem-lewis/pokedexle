import React from "react";
import { TypeBadge } from "../ui/TypeBadge";

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
  return (
    <div className="grid grid-cols-6 gap-1">
      {TYPES.map((type) => (
        <TypeBadge
          key={type}
          type={type}
          className="col-span-1 text-base  text-white md:text-lg"
        >
          {type}
        </TypeBadge>
      ))}
    </div>
  );
}
