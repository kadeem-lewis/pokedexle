"use client";
import {
  Pokemon,
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  pokedexAtom,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import PokemonFeedback from "./classic/PokemonFeedback";
import ClassicGamebox from "./classic/Gamebox";
import WhosThatPokemonGamebox from "./whosthatpokemon/Gamebox";

type GameWrapperProps = {
  pokedex: Pokemon[];
  dailies: Daily;
};

export default function GameWrapper({ pokedex, dailies }: GameWrapperProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  useHydrateAtoms([[dailyAtom, dailies]]);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const { classicId, whosThatPokemonId } = dailies;
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentPath === "/classic") {
      if (searchParams.get("mode") === "unlimited") setMode("classicUnlimited");
      else setMode("classic");
    } else if (currentPath === "/whosthatpokemon") {
      if (searchParams.get("mode") === "unlimited")
        setMode("whosthatpokemonUnlimited");
      else setMode("whosthatpokemon");
    }
  }, [currentPath, searchParams, setMode]);

  useEffect(() => {
    console.log("Set Dailies useEffect is running");
    function setDailies() {
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === classicId,
      );
      const dailyWhosThatPokemon = pokedex.find(
        (pokemon) => pokemon.id === whosThatPokemonId,
      );
      if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");
      if (!dailyWhosThatPokemon) throw new Error("Daily Pokemon Not Found");

      setDailyPokemon((prev) => ({
        ...prev,
        whosthatpokemon: dailyWhosThatPokemon,
        classic: dailyClassicPokemon,
      }));
    }
    setDailies();
  }, [classicId, pokedex, setDailyPokemon, whosThatPokemonId]);

  return (
    <>
      {currentPath === "/classic" && <ClassicGamebox />}
      {currentPath === "/whosthatpokemon" && <WhosThatPokemonGamebox />}
    </>
  );
}
