"use client";
import {
  pokemonToGuessAtom,
  guessedItemsAtom,
  guessAtom,
  dailyDataAtom,
  classicAnswersAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import DailyUnavailable from "@/app/(pokemon)/_components/DailyUnavailable";
import PokemonFeedback from "./PokemonFeedback";
import { useGameMode } from "@/hooks/useGameMode";
import { format } from "date-fns";

export default function DailyGame() {
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { mode } = useGameMode();
  const [{ data, isPending, isError }] = useAtom(dailyDataAtom);
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);

  useEffect(() => {
    if (mode !== "classic") return;
    if (!data?.date) return;
    const date = format(data.date, "yyyy-MM-dd");
    if (date === classicAnswers?.date) {
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
      setClassicAnswers((prev) => ({
        ...prev,
        date,
        answers: [],
      }));
    }
  }, [
    classicAnswers?.date,
    classicAnswers?.answers,
    guessedItems.classic.length,
    mode,
    setClassicAnswers,
    setGuessedItems,
    setGuesses,
    data?.date,
  ]);

  if (isPending) return <Skeleton className="h-48" />;
  if (isError) return <DailyUnavailable />;

  return pokemonToGuess.classic ? (
    <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
  ) : (
    <DailyUnavailable />
  );
}
