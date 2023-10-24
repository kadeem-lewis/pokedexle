import { Pokemon } from "@/atoms/GameAtoms";
import React, { useEffect, useState } from "react";
import Guesses from "../Guesses";
import Image from "next/image";
import {
  currentGameMode,
  pokemonToGuessAtom,
  guessAtom,
  guessedItemsAtom,
  gameOverAtom,
} from "@/atoms/GameAtoms";
import { useAtomValue, useAtom } from "jotai";
import GameOverContent from "../content/GameOverContent";
import OptionsModal from "../ui/OptionsModal";
import { defaultGuesses } from "@/constants";

type ImagePanelProps = {
  correctAnswer: Pokemon;
};

function blurIntensity(guesses: number) {
  switch (guesses) {
    case 1:
      return "blur-1 grayscale";
      break;
    case 2:
      return "blur-2 grayscale";
      break;
    case 3:
      return "blur-3 grayscale";
      break;
    case 4:
      return "blur-4 grayscale";
      break;
    case 5:
      return "blur-5 grayscale";
      break;
    case 6:
      return "blur-6 grayscale";
      break;
    default:
      return "";
  }
}

function calculateValue(value: number, correctValue: number) {
  if (value > correctValue) {
    return;
  }
}

export default function ImagePanel({ correctAnswer }: ImagePanelProps) {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const [range, setRange] = useState({
    generationLowerLimit: "???",
    generationUpperLimit: "???",
    heightLowerLimit: "???",
    heightUpperLimit: "???",
    weightLowerLimit: "???",
    weightUpperLimit: "???",
  });
  const [gameOverClick, setGameOverClick] = useState(false);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  useEffect(() => {
    if (
      guesses <= 0 ||
      guessedItems.some((item) => item.name === pokemonToGuess?.name)
    ) {
      setGameOver((prev) => ({ ...prev, [mode]: true }));
    } else {
      setGameOver((prev) => ({ ...prev, [mode]: false }));
    }
  }, [guessedItems, guesses, mode, pokemonToGuess?.name, setGameOver]);
  useEffect(() => {
    if (gameOver[mode] === true) {
      setGameOverClick(true);
    } else {
      setGameOverClick(false);
    }
  }, [gameOver, mode]);
  return (
    <>
      <Guesses />
      <div
        className={`flex items-center justify-center ${
          !gameOver[mode] ? blurIntensity(guesses) : ""
        }`}
      >
        <Image
          src={correctAnswer.sprite}
          height={300}
          width={300}
          priority={true}
          alt={`${correctAnswer.name} sprite`}
        />
      </div>
      <div className="flex justify-between">
        <div className="space-x-2">
          <span>Gen:</span>
          <span>{guesses < defaultGuesses ? "" : "???"}</span>
        </div>
        <div className="space-x-2">
          <span>Height:</span>
          <span>{guesses < defaultGuesses ? "" : "???"}</span>
        </div>
        <div className="space-x-2">
          <span>Weight:</span>
          <span>{guesses < defaultGuesses ? "" : "???"}</span>
        </div>
      </div>
      {gameOver && (
        <OptionsModal
          isOpen={gameOverClick}
          setIsOpen={setGameOverClick}
          title="Game Over"
        >
          <GameOverContent />
        </OptionsModal>
      )}
    </>
  );
}
