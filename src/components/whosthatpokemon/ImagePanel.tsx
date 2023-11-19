"use client";
import { Pokemon } from "@/atoms/GameAtoms";
import React, { useEffect, useState } from "react";
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
import StatsRange from "./StatsRange";

type ImagePanelProps = {
  correctAnswer: Pokemon;
};

function blurIntensity(guesses: number) {
  switch (guesses) {
    case 1:
      return "blur-sm grayscale";
    case 2:
      return "blur-2 grayscale";
    case 3:
      return "blur grayscale";
    case 4:
      return "blur-md grayscale";
    case 5:
      return "blur-5 grayscale";
    case 6:
      return "blur-lg grayscale";
    default:
      return "";
  }
}

export default function ImagePanel({ correctAnswer }: ImagePanelProps) {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode] as Pokemon;
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode] as Pokemon[];

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
      <StatsRange />

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
