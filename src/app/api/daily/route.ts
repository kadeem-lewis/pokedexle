import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { differenceInCalendarDays, startOfTomorrow } from "date-fns";
import { readJson } from "@/helpers/FileSystem";
import { Pokemon } from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

async function handler(_req: NextRequest) {
  let allPokemon: Pokemon[];
  try {
    allPokemon = (await readJson("/data/pokedex.json")) as Pokemon[];
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return new NextResponse("Error");
  }

  let usedIds: Daily[];
  try {
    usedIds = await prisma.daily.findMany();
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return new NextResponse("Error");
  }

  const unusedClassicPokemon = allPokemon.filter(
    (pokemon) => !usedIds.some((used) => used.classicId === pokemon.id),
  );
  const unusedWhosThatPokemon = allPokemon.filter(
    (pokemon) => !usedIds.some((used) => used.whosThatPokemonId === pokemon.id),
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

  let firstDaily: Daily | null;
  try {
    firstDaily = await prisma.daily.findFirst();
  } catch (error) {
    console.error("Error fetching first daily from database:", error);
    return new NextResponse("Error");
  }

  try {
    const newDaily = await prisma.daily.create({
      data: {
        date: startOfTomorrow(),
        day: firstDaily
          ? differenceInCalendarDays(startOfTomorrow(), firstDaily.date)
          : 1,
        classicId: classic.id,
        whosThatPokemonId: whosThatPokemon.id,
      },
    });
    console.log("New daily entry added:", newDaily);
    return new NextResponse("OK");
  } catch (error) {
    console.error("Error adding new daily entry:", error);
    return new NextResponse("Error");
  }
}

export const GET = verifySignatureAppRouter(handler);
