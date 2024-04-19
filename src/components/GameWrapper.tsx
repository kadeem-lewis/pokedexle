"use client";
import {
  Pokemon,
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  gameOverAtom,
  pokedexAtom,
} from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ClassicGamebox from "./classic/Gamebox";
import WhosThatPokemonGamebox from "./whosthatpokemon/Gamebox";
import PokemonTypes from "./PokemonTypes";
import PokemonSearch from "./PokemonSearch";

type GameWrapperProps = {
  pokedex: Pokemon[];
};

export default function GameWrapper({ pokedex }: GameWrapperProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [mode, setMode] = useAtom(currentGameMode);
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const dailyData = useAtomValue<Promise<Daily | null>>(dailyAtom);
  const { classicId, whosThatPokemonId } = dailyData ?? {
    classicId: null,
    whosThatPokemonId: null,
  };

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
    function setDailies() {
      const dailyClassicPokemon =
        pokedex.find((pokemon) => pokemon.id === classicId) ?? null;
      const dailyWhosThatPokemon =
        pokedex.find((pokemon) => pokemon.id === whosThatPokemonId) ?? null;
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
      {!gameOver[mode] &&
      (searchParams.get("mode") === "unlimited" || dailyData !== null) ? (
        <>
          <PokemonTypes />
          <PokemonSearch />
        </>
      ) : null}
    </>
  );
}
