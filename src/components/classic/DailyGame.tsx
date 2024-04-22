import {
  pokemonToGuessAtom,
  guessedItemsAtom,
  guessAtom,
  currentGameMode,
  dailyDataAtom,
  classicAnswersAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { Skeleton } from "../ui/Skeleton";
import DailyUnavailable from "../DailyUnavailable";
import PokemonFeedback from "./PokemonFeedback";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

export default function DailyGame() {
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const mode = useAtomValue(currentGameMode);
  const [{ data, isPending, isError }] = useAtom(dailyDataAtom);
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);

  console.log(
    today(getLocalTimeZone()).add({ days: 1 }).toDate(getLocalTimeZone()),
  );

  useEffect(() => {
    if (mode !== "classic") return;
    if (!data?.date) return;
    const date = new Date(data.date);
    const serverTime = new CalendarDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toString();
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
