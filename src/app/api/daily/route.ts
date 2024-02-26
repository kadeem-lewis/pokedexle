import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { differenceInCalendarDays, startOfTomorrow } from "date-fns";
import allPokemon from "@/data/pokedex.json";
import { Daily } from "@prisma/client";

//TODO: vercel isn't able to read the pokedex.json file
export async function GET() {
  let usedIds: Daily[];
  try {
    usedIds = await prisma.daily.findMany();
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching data from database: ${error}` },
      { status: 500 },
    );
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
    firstDaily = await prisma.daily.findUnique({
      where: { day: 1 },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching first daily: ${error}` },
      { status: 500 },
    );
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
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Error adding new daily entry: ${error}` },
      { status: 500 },
    );
  }
}
