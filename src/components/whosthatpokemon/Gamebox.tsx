"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { format } from "date-fns";

import {
  currentGameMode,
  dailyAtom,
  guessAtom,
  guessedItemsAtom,
  pokemonToGuessAtom,
  whosthatpokemonAnswersAtom,
  whosthatpokemonPracticeAnswersAtom,
  whosthatpokemonPracticeSolutionAtom,
} from "@/atoms/GameAtoms";
import ImagePanel from "./ImagePanel";
import { defaultGuesses } from "@/constants";
import { Daily } from "@prisma/client";

export default function Gamebox() {
  const mode = useAtomValue(currentGameMode);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const whosthatpokemonPracticeAnswers = useAtomValue(
    whosthatpokemonPracticeAnswersAtom,
  );
  const [whosthatpokemonPracticeSolution, setWhosthatpokemonPracticeSolution] =
    useAtom(whosthatpokemonPracticeSolutionAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { date } = useAtomValue(dailyAtom) as Daily;
  const [whosthatpokemonAnswers, setWhosthatpokemonAnswers] = useAtom(
    whosthatpokemonAnswersAtom,
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (mode !== "whosthatpokemon") return;
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === whosthatpokemonAnswers?.date) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemon: whosthatpokemonAnswers?.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemon:
          defaultGuesses - whosthatpokemonAnswers?.answers.length,
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
    whosthatpokemonAnswers?.date,
    whosthatpokemonAnswers?.answers,
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

  useEffect(() => {
    if (
      mode === "whosthatpokemonUnlimited" &&
      whosthatpokemonPracticeSolution === null
    ) {
      setWhosthatpokemonPracticeSolution(
        pokemonToGuess.whosthatpokemonUnlimited,
      );
    }
  }, [
    mode,
    pokemonToGuess.whosthatpokemonUnlimited,
    setWhosthatpokemonPracticeSolution,
    whosthatpokemonPracticeSolution,
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
