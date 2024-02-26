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
import MyComboBox from "./ui/MyComboBox";
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
  const { classicId, whosThatPokemonId } =
    useAtomValue<Promise<Daily>>(dailyAtom);

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
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === classicId,
      );
      const dailyWhosThatPokemon = pokedex.find(
        (pokemon) => pokemon.id === whosThatPokemonId,
      );
      if (!dailyWhosThatPokemon) throw new Error("Daily WTP Pokemon Not Found");
      if (!dailyClassicPokemon)
        throw new Error("Daily Classic Pokemon Not Found");

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
      {!gameOver[mode] && (
        <>
          <PokemonTypes />
          <MyComboBox />
          <PokemonSearch />
        </>
      )}
    </>
  );
}
