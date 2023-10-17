import Gamebox from "@/components/whosthatpokemon/Gamebox";
import { prisma } from "@/lib/prisma";
import React from "react";
export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};
export default async function WhosThatPokemon() {
  const pokedex = await prisma.pokemon.findMany();
  return (
    <>
      <Gamebox pokedex={pokedex} />
    </>
  );
}
