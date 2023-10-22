import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { addDays, startOfDay } from "date-fns";
import { readJson } from "@/helpers/FileSystem";
import { Move, Pokemon } from "@/atoms/GameAtoms";

export async function GET(params: NextRequest) {
  try {
    const allPokemon = (await readJson(
      `${process.cwd()}/data/pokedex.json`,
    )) as Pokemon[];
    const allMoves = (await readJson(
      `${process.cwd()}/data/movedex.json`,
    )) as Move[];

    // Fetch Moves and Pokémon that have been used in the Daily table
    const usedClassicPokemonIds = await prisma.daily.findMany({
      select: { classicId: true },
    });
    const usedWhosThatPokemonIds = await prisma.daily.findMany({
      select: { whosThatPokemonId: true },
    });
    const usedMoveIds = await prisma.daily.findMany({
      select: { moveId: true },
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
    const unusedMoves = allMoves.filter(
      (move) => !usedMoveIds.some((used) => used.moveId === move.id),
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

    // If there are no more unused Moves, throw an error
    if (!unusedMoves.length) {
      throw new Error("No unused Moves available.");
    }

    const move = unusedMoves[Math.floor(Math.random() * unusedMoves.length)];

    // Getting the current date, advancing it by 1 day, and setting the time to midnight
    const nextDayMidnight = startOfDay(addDays(new Date(), 1));

    const newDaily = await prisma.daily.create({
      data: {
        date: nextDayMidnight,
        classicId: classic.id,
        whosThatPokemonId: whosThatPokemon.id,
        moveId: move.id,
      },
    });

    console.log("New daily entry added:", newDaily);
    return new Response("OK");
  } catch (error) {
    console.error("Error adding new daily entry:", error);
    return new Response("Error");
  }
}
