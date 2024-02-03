"use client";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  pokemonToGuessAtom,
  newGameAtom,
  currentGameMode,
  guessAtom,
  Pokemon,
  gameOverAtom,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import Image from "next/image";
import Countdown from "../Countdown";
import { startOfTomorrow } from "date-fns";
import Share from "../Share";
import { Button } from "../ui/Button";

export default function GameOverContent() {
  const mode = useAtomValue(currentGameMode);
  const setNewGame = useSetAtom(newGameAtom);
  const setGameOver = useSetAtom(gameOverAtom);
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const pokemonGuesses = useAtomValue(pokemonToGuessAtom);
  const correctAnswer = pokemonGuesses[mode] as Pokemon | null;

  const handleNewGameClick = () => {
    setGameOver((prev) => ({
      ...prev,
      [mode]: false,
    }));
    setTimeout(() => {
      setNewGame();
    }, 500);
  };

  return (
    <div>
      {mode === "classicUnlimited" || mode === "whosthatpokemonUnlimited" ? (
        <div className="flex justify-center gap-4 text-2xl">
          <span>Wanna try again?</span>
          <Button
            variant="flat"
            className="bg-blue-400 hover:bg-blue-500"
            onClick={() => handleNewGameClick()}
          >
            New Game
          </Button>
        </div>
      ) : (
        <>
          <p className="text-2xl">New Game in:</p>
          <Countdown targetDate={startOfTomorrow()} />
          <Share />
        </>
      )}
    </div>
  );
}
