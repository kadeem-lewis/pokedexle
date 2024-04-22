"use client";
import {
  Pokemon,
  classicPracticeSolutionAtom,
  currentGameMode,
  dailyDataAtom,
  dateAtom,
  gameOverAtom,
  pokedexAtom,
  pokemonToGuessAtom,
  whosthatpokemonPracticeSolutionAtom,
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
  const gameOver = useAtomValue(gameOverAtom);
  const [{ data, isPending, isError }] = useAtom(dailyDataAtom);
  const [, setAtomDate] = useAtom(dateAtom);
  const setPokemonToGuess = useSetAtom(pokemonToGuessAtom);
  console.log(data, isPending, isError);
  const classicPracticeSolution = useAtomValue(classicPracticeSolutionAtom);
  const whosthatpokemonPracticeSolution = useAtomValue(
    whosthatpokemonPracticeSolutionAtom,
  );

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
    // Setting daily values from fetched data
    const dailyClassicPokemon =
      pokedex.find((pokemon) => pokemon.id === data?.classicId) ?? null;
    const dailyWhosThatPokemon =
      pokedex.find((pokemon) => pokemon.id === data?.whosThatPokemonId) ?? null;

    // Setting up the initial states
    const initialStates = {
      classic: dailyClassicPokemon,
      whosthatpokemon: dailyWhosThatPokemon,
      classicUnlimited: classicPracticeSolution,
      whosthatpokemonUnlimited: whosthatpokemonPracticeSolution,
    };

    // Getting parameters from search
    const searchParamAnswer = searchParams.has("x")
      ? decodeURIComponent(atob(String(searchParams.get("x"))))
      : null;
    let answer;
    if (searchParamAnswer && !isNaN(Number(searchParamAnswer))) {
      answer = pokedex.find(
        (pokemon) => pokemon.id === Number(searchParamAnswer),
      );
    }

    // Apply logic based on game mode and available data
    if (answer) {
      if (mode === "classicUnlimited") {
        initialStates.classicUnlimited = answer;
      } else if (mode === "whosthatpokemonUnlimited") {
        initialStates.whosthatpokemonUnlimited = answer;
      }
    } else {
      // If no answer from URL or local storage, assign random pokemon
      const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
      if (mode === "classicUnlimited" && !initialStates.classicUnlimited) {
        initialStates.classicUnlimited = randomPokemon;
      }
      if (
        mode === "whosthatpokemonUnlimited" &&
        !initialStates.whosthatpokemonUnlimited
      ) {
        initialStates.whosthatpokemonUnlimited = randomPokemon;
      }
    }

    // Update state atom with these initialized values
    setPokemonToGuess((prev) => ({
      ...prev,
      ...initialStates,
    }));
  }, [
    data,
    pokedex,
    searchParams,
    mode,
    setPokemonToGuess,
    classicPracticeSolution,
    whosthatpokemonPracticeSolution,
  ]);

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
