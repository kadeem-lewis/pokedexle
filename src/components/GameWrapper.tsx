"use client";
import {
  Pokemon,
  currentGameMode,
  dailyDataAtom,
  dailyPokemonAtom,
  dateAtom,
  gameOverAtom,
  pokedexAtom,
} from "@/atoms/GameAtoms";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ClassicGamebox from "./classic/Gamebox";
import WhosThatPokemonGamebox from "./whosthatpokemon/Gamebox";
import PokemonTypes from "./PokemonTypes";
import PokemonSearch from "./PokemonSearch";
import { getLocalTimeZone, today } from "@internationalized/date";

type GameWrapperProps = {
  pokedex: Pokemon[];
};

export default function GameWrapper({ pokedex }: GameWrapperProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [mode, setMode] = useAtom(currentGameMode);
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const [{ data, isPending, isError }] = useAtom(dailyDataAtom);
  const [, setAtomDate] = useAtom(dateAtom);
  console.log(data, isPending, isError);

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
    if (searchParams.has("date")) {
      setAtomDate(String(searchParams.get("date")));
    } else {
      setAtomDate(today(getLocalTimeZone()).toString());
    }
  }, [searchParams, setAtomDate]);

  useEffect(() => {
    console.log("dailyData", data);
    function setDailies() {
      const dailyClassicPokemon =
        pokedex.find((pokemon) => pokemon.id === data?.classicId) ?? null;
      const dailyWhosThatPokemon =
        pokedex.find((pokemon) => pokemon.id === data?.whosThatPokemonId) ??
        null;
      setDailyPokemon((prev) => ({
        ...prev,
        whosthatpokemon: dailyWhosThatPokemon,
        classic: dailyClassicPokemon,
      }));
    }
    setDailies();
  }, [data, pokedex, setDailyPokemon]);

  return (
    <>
      {currentPath === "/classic" && <ClassicGamebox />}
      {currentPath === "/whosthatpokemon" && <WhosThatPokemonGamebox />}
      {!gameOver[mode] && (searchParams.get("mode") === "unlimited" || data) ? (
        <>
          <PokemonTypes />
          <PokemonSearch />
        </>
      ) : null}
    </>
  );
}
