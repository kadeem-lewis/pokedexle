import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import { utcToZonedTime } from "date-fns-tz";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export const dynamic = "force-dynamic";

export default async function Classic() {
  const pokedex = await readJson("/data/pokedex.json");
  const dailies = await prisma.daily.findUnique({
    where: {
      date: utcToZonedTime(new Date(),"America/New_York"),
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
