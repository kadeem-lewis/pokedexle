import { Pokemon } from "@/atoms/GameAtoms";
import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "date-fns";
import { start } from "repl";

type WhosThatPokemonProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

export default async function WhosThatPokemon({
  searchParams,
}: WhosThatPokemonProps) {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  console.log([...pokedex.slice(0, 10)]);
  console.log(startOfToday());
  const dailies = await prisma.daily.findUnique({
    where: {
      date: startOfToday(),
    },
  });
  console.log(dailies);
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" searchParams={searchParams} />
      <Guesses/>
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
    </>
  );
}
