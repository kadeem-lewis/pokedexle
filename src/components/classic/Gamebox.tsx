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
  classicPracticeSolutionAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import PokemonFeedback from "./PokemonFeedback";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

export default function Gamebox() {
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [classicPracticeSolution, setClassicPracticeSolution] = useAtom(
    classicPracticeSolutionAtom,
  );
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const mode = useAtomValue(currentGameMode);
  const dailyData = useAtomValue(dailyAtom);
  const { date } = dailyData ?? { date: null };
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (mode !== "classic") return;
    if (date === null) return;
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === classicAnswers?.date) {
      setGuessedItems((prev) => ({
        ...prev,
        classic: classicAnswers?.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classic: defaultGuesses - classicAnswers?.answers.length,
      }));
    } else {
      console.log("HaHa I keep printing");
      setClassicAnswers({
        date: serverTime,
        answers: [],
      });
    }
  }, [
    classicAnswers?.date,
    classicAnswers?.answers,
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

  useEffect(() => {
    if (mode === "classicUnlimited" && classicPracticeSolution === null) {
      setClassicPracticeSolution(pokemonToGuess.classicUnlimited);
    }
  }, [
    classicPracticeSolution,
    mode,
    pokemonToGuess.classicUnlimited,
    pokemonToGuess.whosthatpokemonUnlimited,
    setClassicPracticeSolution,
  ]);

  return (
    <>
      {!searchParams.has("mode") &&
        (pokemonToGuess.classic ? (
          <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
        ) : (
          <div className="flex h-40 flex-col items-center justify-center">
            <p className="text-center text-3xl font-bold uppercase">
              Daily Mode is currently unavailable. Check back tomorrow
            </p>
            <p>or</p>
            <Link
              href="?mode=unlimited"
              className={buttonVariants({ variant: "flat" })}
            >
              Try Unlimited Mode
            </Link>
          </div>
        ))}
      {pokemonToGuess.classicUnlimited &&
        searchParams.get("mode") === "unlimited" && (
          <PokemonFeedback correctAnswer={pokemonToGuess.classicUnlimited} />
        )}
    </>
  );
}
