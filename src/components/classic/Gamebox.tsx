"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { format } from "date-fns";

import {
  pokemonToGuessAtom,
  currentGameMode,
  classicPracticeAnswersAtom,
  guessedItemsAtom,
  guessAtom,
  classicAnswersAtom,
  dailyAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import PokemonFeedback from "./PokemonFeedback";
import { Daily } from "@prisma/client";

export default function Gamebox() {
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const mode = useAtomValue(currentGameMode);
  const { date } = useAtomValue(dailyAtom) as Daily;
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (mode !== "classic") return;
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === classicAnswers.date) {
      setGuessedItems((prev) => ({
        ...prev,
        classic: classicAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classic: defaultGuesses - classicAnswers.answers.length,
      }));
    } else {
      console.log("HaHa I keep printing");
      setClassicAnswers({
        date: serverTime,
        answers: [],
      });
    }
  }, [
    classicAnswers.date,
    classicAnswers.answers,
    date,
    guessedItems.classic.length,
    mode,
    setClassicAnswers,
    setGuessedItems,
    setGuesses,
  ]);

  useEffect(() => {
    console.log("Classic Unlimited useEffect is running");
    if (
      classicPracticeAnswers !== null &&
      mode === "classicUnlimited" &&
      guessedItems.classicUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        classicUnlimited: classicPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classicUnlimited: defaultGuesses - classicPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    classicPracticeAnswers,
    setGuessedItems,
    setGuesses,
    guessedItems.classicUnlimited,
  ]);

  return (
    <>
      {pokemonToGuess.classic && !searchParams.has("mode") && (
        <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
      )}
      {pokemonToGuess.classicUnlimited &&
        searchParams.get("mode") === "unlimited" && (
          <PokemonFeedback correctAnswer={pokemonToGuess.classicUnlimited} />
        )}
    </>
  );
}
