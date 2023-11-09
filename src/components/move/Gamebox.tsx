"use client";
import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  guessAtom,
  guessedItemsAtom,
  moveAnswersAtom,
  moveListAtom,
  movePracticeAnswersAtom,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { type Move } from "@/atoms/GameAtoms";
import PokemonTypes from "../PokemonTypes";
import { useHydrateAtoms } from "jotai/utils";
import { format } from "date-fns";
import { defaultGuesses } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import MoveFeedback from "./MoveFeedback";

type GameboxProps = {
  moveList: Move[];
};

export default function Gamebox({ moveList }: GameboxProps) {
  useHydrateAtoms([[moveListAtom, moveList]]);
  const [mode, setMode] = useAtom(currentGameMode);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const movePracticeAnswers = useAtomValue(movePracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { date, moveId } = useAtomValue<Promise<Daily>>(dailyAtom);
  const [moveAnswers, setMoveAnswers] = useAtom(moveAnswersAtom);
  const setDailyMove = useSetAtom(dailyPokemonAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentPath === "/move") setMode("move");
    if (searchParams.get("mode") === "unlimited") setMode("moveUnlimited");
  }, [currentPath, searchParams, setMode]);

  useEffect(() => {
    function setDailies() {
      const dailyClassicMove = moveList.find((move) => move.id === moveId);
      if (!dailyClassicMove) throw new Error("Daily Move Not Found");

      setDailyMove((prev) => ({
        ...prev,
        move: dailyClassicMove,
      }));
    }
    setDailies();
  }, [moveId, moveList, setDailyMove]);

  useEffect(() => {
    if (mode !== "move") return;

    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === moveAnswers.date) {
      setGuessedItems((prev) => ({
        ...prev,
        move: moveAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        move: defaultGuesses - moveAnswers.answers.length,
      }));
    } else {
      setMoveAnswers({
        date: serverTime,
        answers: [],
      });
    }
  }, [
    date,
    guessedItems.classic.length,
    mode,
    setGuessedItems,
    setGuesses,
    moveAnswers.date,
    moveAnswers.answers,
    setMoveAnswers,
  ]);

  useEffect(() => {
    if (
      movePracticeAnswers !== null &&
      mode === "moveUnlimited" &&
      guessedItems.moveUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        moveUnlimited: movePracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        moveUnlimited: defaultGuesses - movePracticeAnswers.length,
      }));
    }
  }, [
    mode,
    setGuessedItems,
    setGuesses,
    guessedItems.whosthatpokemonUnlimited,
    movePracticeAnswers,
    guessedItems.moveUnlimited.length,
  ]);

  return (
    <>
      {pokemonToGuess.move && !searchParams.has("mode") && (
        <MoveFeedback correctAnswer={pokemonToGuess.move} />
      )}

      {pokemonToGuess.moveUnlimited &&
        searchParams.get("mode") === "unlimited" && (
          <MoveFeedback correctAnswer={pokemonToGuess.moveUnlimited} />
        )}

      {/* <PokemonTypes /> */}
    </>
  );
}
