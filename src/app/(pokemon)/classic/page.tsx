import { Pokemon } from "@/atoms/GameAtoms";
import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";
import {  formatISO } from "date-fns";

type ClassicProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic({ searchParams }: ClassicProps) {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  const dailies = await prisma.daily.findUnique({
    where: {
      date: formatISO(new Date(), { representation: "date" })
    },
  });

  return (
    <>
      <ModeSwitch href="/classic" searchParams={searchParams} />
      <Guesses />
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
    </>
  );
}
