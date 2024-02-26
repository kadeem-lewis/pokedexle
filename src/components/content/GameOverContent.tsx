"use client";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { newGameAtom, currentGameMode, gameOverAtom } from "@/atoms/GameAtoms";
import Countdown from "../Countdown";
import { startOfTomorrow } from "date-fns";
import Share from "../Share";
import { Button } from "../ui/Button";

export default function GameOverContent() {
  const mode = useAtomValue(currentGameMode);
  const setNewGame = useSetAtom(newGameAtom);
  const setGameOver = useSetAtom(gameOverAtom);

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
            onPress={() => handleNewGameClick()}
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
