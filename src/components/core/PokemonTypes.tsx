import React from "react";
const TYPES = [
  {
    name: "normal",
    color: "bg-normal-200",
    borderTopColor: "border-t-normal-100",
    borderBottomColor: "border-b-normal-300",
  },

  {
    name: "fire",
    color: "bg-fire-200",
    borderTopColor: "border-t-fire-100",
    borderBottomColor: "border-b-fire-300",
  },

  {
    name: "water",
    color: "bg-water-200",
    borderTopColor: "border-t-water-100",
    borderBottomColor: "border-b-water-300",
  },

  {
    name: "grass",
    color: "bg-grass-200",
    borderTopColor: "border-t-grass-100",
    borderBottomColor: "border-b-grass-300",
  },

  {
    name: "electric",
    color: "bg-electric-200",
    borderTopColor: "border-t-electric-100",
    borderBottomColor: "border-b-electric-300",
  },

  {
    name: "ice",
    color: "bg-ice-200",
    borderTopColor: "border-t-ice-100",
    borderBottomColor: "border-b-ice-300",
  },

  {
    name: "fighting",
    color: "bg-fighting-200",
    borderTopColor: "border-t-fighting-100",
    borderBottomColor: "border-b-fighting-300",
  },

  {
    name: "poison",
    color: "bg-poison-200",
    borderTopColor: "border-t-poison-100",
    borderBottomColor: "border-b-poison-300",
  },

  {
    name: "ground",
    color: "bg-ground-200",
    borderTopColor: "border-t-ground-100",
    borderBottomColor: "border-b-ground-300",
  },

  {
    name: "flying",
    color: "bg-flying-200",
    borderTopColor: "border-t-flying-100",
    borderBottomColor: "border-b-flying-300",
  },

  {
    name: "psychic",
    color: "bg-psychic-200",
    borderTopColor: "border-t-psychic-100",
    borderBottomColor: "border-b-psychic-300",
  },

  {
    name: "bug",
    color: "bg-bug-200",
    borderTopColor: "border-t-bug-100",
    borderBottomColor: "border-b-bug-300",
  },

  {
    name: "rock",
    color: "bg-rock-200",
    borderTopColor: "border-t-rock-100",
    borderBottomColor: "border-b-rock-300",
  },

  {
    name: "ghost",
    color: "bg-ghost-200",
    borderTopColor: "border-t-ghost-100",
    borderBottomColor: "border-b-ghost-300",
  },

  {
    name: "dark",
    color: "bg-dark-200",
    borderTopColor: "border-t-dark-100",
    borderBottomColor: "border-b-dark-300",
  },

  {
    name: "dragon",
    color: "bg-dragon-200",
    borderTopColor: "border-t-dragon-100",
    borderBottomColor: "border-b-dragon-300",
  },

  {
    name: "steel",
    color: "bg-steel-200",
    borderTopColor: "border-t-steel-100",
    borderBottomColor: "border-b-steel-300",
  },

  {
    name: "fairy",
    color: "bg-fairy-200",
    borderTopColor: "border-t-fairy-100",
    borderBottomColor: "border-b-fairy-300",
  },
];
export default function PokemonTypes() {
  return (
    <div className="grid grid-cols-6 gap-1">
      {TYPES.map((type) => (
        <div
          key={type.name}
          className={`col-span-1 rounded-md text-center font-medium uppercase ${type.color} text-shadow border-b-2 border-t-2 text-base leading-none text-white md:text-lg ${type.borderBottomColor} ${type.borderTopColor}`}
        >
          {type.name}
        </div>
      ))}
    </div>
  );
}
