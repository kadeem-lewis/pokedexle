import { Pokemon } from "@prisma/client";
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

export default function ImagePanel({ correctAnswer }: ImagePanelProps) {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
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
        className={`flex items-center justify-center ${blurIntensity(guesses)}`}
      >
        <Image
          src={correctAnswer.sprite}
          height={300}
          width={300}
          priority={true}
          alt={`${correctAnswer.name} sprite`}
        />
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
