import { cache } from "react";
import MyComboBox from "@/components/ui/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { Pokemon } from "@/atoms/GameAtoms";
import PokemonTypes from "@/components/core/PokemonTypes";
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
      <Gamebox itemArray={pokemonList} />
      <MyComboBox data={pokemonList} />
      <PokemonTypes />
    </div>
  );
}
