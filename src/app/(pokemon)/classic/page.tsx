import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import {  startOfToday } from "date-fns";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = await readJson("/data/pokedex.json");
  const dailies = await prisma.daily.findUnique({
    where: {
      date: startOfToday(),
    },
  });

  return (
    <>
      <ModeSwitch href="/classic"/>
      <Guesses />
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
    </>
  );
}
