import { Pokemon } from "@/atoms/GameAtoms";
import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import { startOfToday, format } from "date-fns";

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
  const dailies = await prisma.daily.findUnique({
    where: {
      date: format(new Date(), "yyyy-MM-dd")
    },
  });
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" searchParams={searchParams} />
      <Guesses/>
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
    </>
  );
}
