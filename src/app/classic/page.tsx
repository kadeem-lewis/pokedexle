import { cache } from "react";
import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { Pokemon } from "@/atoms/GameAtoms";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Pokedexle | Classic",
  description: "Guess Pokemon based on hints from previous guesses",
};

export default async function Classic() {
  const pokemonList: Pokemon[] = (await prisma.pokemon.findMany()) || [];
  return (
    <div>
      <OptionsBar />
      <Gamebox data={pokemonList} />
    </div>
  );
}
