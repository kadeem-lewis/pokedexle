"use client";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  newGameAtom,
  currentGameMode,
  gameOverAtom,
  guessAtom,
  guessedItemsAtom,
  Pokemon,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import Countdown from "../Countdown";
import { startOfTomorrow } from "date-fns";
//TODO: probably gonna have to create today and then add one to it
import Share from "../Share";
import { Button } from "../ui/Button";

type GameOverContentProps = {
  children?: React.ReactNode;
};

export default function GameOverContent({ children }: GameOverContentProps) {
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
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="text-3xl">
        {guesses > 0 &&
        guessedItems.some((item) => item.name === correctAnswer?.name) ? (
          <p>You won!!</p>
        ) : (
          <p>You Lost. Better luck Next Time!</p>
        )}
      </div>
      <div className=" text-center">{children}</div>
      {mode === "classicUnlimited" || mode === "whosthatpokemonUnlimited" ? (
        <div className="flex justify-center gap-4 text-2xl">
          <span>Wanna try again?</span>
          <Button
            variant="flat"
            className="bg-blue-400 hover:bg-blue-500"
            onPress={() => handleNewGameClick()}
          >
            New Game
          </Button>
        </div>
      ) : (
        <>
          <p className="text-2xl">New Game in:</p>
          <Countdown targetDate={startOfTomorrow()} />
        </>
      )}
      <Share />
    </div>
  );
}
