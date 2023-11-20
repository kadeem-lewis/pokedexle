import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};


export default async function WhosThatPokemon() {
  const pokedex = await readJson("/data/pokedex.json");
  const dailies = await prisma.daily.findUnique({
    where: {
      date: utcToZonedTime(startOfToday(),"America/New_York"),
    },
  });
  return (
    <>
      <ModeSwitch href="/whosthatpokemon"/>
      <Guesses/>
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
    </>
  );
}
