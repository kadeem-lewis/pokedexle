"use client";
import React, { useEffect } from "react";
import MyComboBox from "../ui/MyComboBox";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Pokemon,
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  guessAtom,
  guessedItemsAtom,
  pokedexAtom,
  pokemonToGuessAtom,
  whosthatpokemonAnswersAtom,
  whosthatpokemonPracticeAnswersAtom,
} from "@/atoms/GameAtoms";
import PokemonTypes from "../PokemonTypes";
import ImagePanel from "./ImagePanel";
import { useHydrateAtoms } from "jotai/utils";
import { format } from "date-fns";
import { defaultGuesses } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { Daily } from "@prisma/client";

type GameboxProps = {
  pokedex: Pokemon[];
  dailies: Daily;
};

export default function Gamebox({ pokedex, dailies }: GameboxProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [mode, setMode] = useAtom(currentGameMode);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const whosthatpokemonPracticeAnswers = useAtomValue(
    whosthatpokemonPracticeAnswersAtom,
  );
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { date, whosThatPokemonId } = dailies;
  const [whosthatpokemonAnswers, setWhosthatpokemonAnswers] = useAtom(
    whosthatpokemonAnswersAtom,
  );
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentPath === "/whosthatpokemon") setMode("whosthatpokemon");
    if (searchParams.get("mode") === "unlimited")
      setMode("whosthatpokemonUnlimited");
  }, [currentPath, searchParams, setMode]);

  useEffect(() => {
    function setDailies() {
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === whosThatPokemonId,
      );
      if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");

      setDailyPokemon((prev) => ({
        ...prev,
        whosthatpokemon: dailyClassicPokemon,
      }));
    }
    setDailies();
  }, [pokedex, setDailyPokemon, whosThatPokemonId]);

  useEffect(() => {
    if (mode !== "whosthatpokemon") return;
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === whosthatpokemonAnswers.date) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemon: whosthatpokemonAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemon: defaultGuesses - whosthatpokemonAnswers.answers.length,
      }));
    } else {
      setWhosthatpokemonAnswers({
        date: serverTime,
        answers: [],
      });
    }
  }, [
    date,
    guessedItems.classic.length,
    mode,
    whosthatpokemonAnswers.date,
    whosthatpokemonAnswers.answers,
    setGuessedItems,
    setGuesses,
    setWhosthatpokemonAnswers,
  ]);

  useEffect(() => {
    if (
      whosthatpokemonPracticeAnswers !== null &&
      mode === "whosthatpokemonUnlimited" &&
      guessedItems.whosthatpokemonUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemonUnlimited: whosthatpokemonPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemonUnlimited:
          defaultGuesses - whosthatpokemonPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    setGuessedItems,
    setGuesses,
    guessedItems.whosthatpokemonUnlimited,
    whosthatpokemonPracticeAnswers,
  ]);

  return (
    <>
      {pokemonToGuess.whosthatpokemon && !searchParams.has("mode") && (
        <ImagePanel correctAnswer={pokemonToGuess.whosthatpokemon} />
      )}
      {pokemonToGuess.whosthatpokemonUnlimited &&
        searchParams.get("mode") === "unlimited" && (
          <ImagePanel correctAnswer={pokemonToGuess.whosthatpokemonUnlimited} />
        )}
    </>
  );
}
