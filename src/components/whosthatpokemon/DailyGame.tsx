import {
  currentGameMode,
  guessedItemsAtom,
  guessAtom,
  whosthatpokemonAnswersAtom,
  pokemonToGuessAtom,
  dailyDataAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import { format } from "date-fns";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import ImagePanel from "./ImagePanel";
import DailyUnavailable from "../DailyUnavailable";
import { Skeleton } from "../ui/Skeleton";

export default function DailyGame() {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const [{ data, isPending, isError }] = useAtom(dailyDataAtom);
  const [whosthatpokemonAnswers, setWhosthatpokemonAnswers] = useAtom(
    whosthatpokemonAnswersAtom,
  );

  useEffect(() => {
    if (mode !== "whosthatpokemon") return;
    if (!data?.date) return;
    const serverTime = format(new Date(data.date), "yyyy-MM-dd");
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
    guessedItems.classic.length,
    mode,
    whosthatpokemonAnswers?.date,
    whosthatpokemonAnswers?.answers,
    setGuessedItems,
    setGuesses,
    setWhosthatpokemonAnswers,
    data?.date,
  ]);

  if (isPending) return <Skeleton className="h-48" />;
  if (isError) return <DailyUnavailable />;

  return pokemonToGuess.whosthatpokemon ? (
    <ImagePanel correctAnswer={pokemonToGuess.whosthatpokemon} />
  ) : (
    <DailyUnavailable />
  );
}
