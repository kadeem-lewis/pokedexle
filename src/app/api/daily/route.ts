import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfTomorrow } from "date-fns";
import { readJson } from "@/helpers/FileSystem";
import { Pokemon } from "@/atoms/GameAtoms";

export async function GET(params: NextRequest) {
  try {
    const allPokemon = (await readJson("/data/pokedex.json")) as Pokemon[];

    // Fetch Moves and Pokémon that have been used in the Daily table
    const usedClassicPokemonIds = await prisma.daily.findMany({
      select: { classicId: true },
    });
    const usedWhosThatPokemonIds = await prisma.daily.findMany({
      select: { whosThatPokemonId: true },
    });

    const unusedClassicPokemon = allPokemon.filter(
      (pokemon) =>
        !usedClassicPokemonIds.some((used) => used.classicId === pokemon.id),
    );
    const unusedWhosThatPokemon = allPokemon.filter(
      (pokemon) =>
        !usedWhosThatPokemonIds.some(
          (used) => used.whosThatPokemonId === pokemon.id,
        ),
    );

    // Random selection logic remains the same
    const classic =
      unusedClassicPokemon.length > 0
        ? unusedClassicPokemon[
            Math.floor(Math.random() * unusedClassicPokemon.length)
          ]
        : allPokemon[Math.floor(Math.random() * allPokemon.length)];

    const whosThatPokemon =
      unusedWhosThatPokemon.length > 0
        ? unusedWhosThatPokemon[
            Math.floor(Math.random() * unusedWhosThatPokemon.length)
          ]
        : allPokemon[Math.floor(Math.random() * allPokemon.length)];

    const newDaily = await prisma.daily.create({
      data: {
        date: startOfTomorrow(),
        classicId: classic.id,
        whosThatPokemonId: whosThatPokemon.id,
        moveId: Math.floor(Math.random() * 1000) + 1,
      },
    });

    console.log("New daily entry added:", newDaily);
    return new Response("OK");
  } catch (error) {
    console.error("Error adding new daily entry:", error);
    return new Response("Error");
  }
}
