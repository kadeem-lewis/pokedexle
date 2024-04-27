"use client";
import { Pokemon } from "@/atoms/GameAtoms";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  currentGameMode,
  pokemonToGuessAtom,
  guessAtom,
  guessedItemsAtom,
  gameOverAtom,
} from "@/atoms/GameAtoms";
import { useAtomValue, useAtom } from "jotai";
import GameOverContent from "@/app/(pokemon)/_components/content/GameOverContent";
import StatsRange from "./StatsRange";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { PokemonType } from "@/app/(pokemon)/_components/PokemonTypes";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";

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

  return (
    <>
      <div
        className={`relative flex items-center justify-center ${
          !gameOver[mode] ? blurIntensity(guesses) : ""
        }`}
      >
        <Image
          src={correctAnswer.sprite}
          height={400}
          width={400}
          priority={true}
          alt={`${correctAnswer.name} sprite`}
        />
      </div>

      {!gameOver[mode] ? (
        <StatsRange />
      ) : (
        <div className="space-y-2 text-center">
          <p className="text-4xl font-bold capitalize">{correctAnswer.name}</p>
          <span className="flex items-center justify-center gap-4">
            {correctAnswer.types
              .filter((type) => type !== "none")
              .map((type) => (
                <TypeBadge
                  type={type as PokemonType}
                  key={type}
                  className="px-2  text-base text-white md:text-lg"
                >
                  {type}
                </TypeBadge>
              ))}
          </span>
          <div className="my-4 flex justify-between text-2xl">
            <div className="space-x-2">
              <span>Gen:</span>
              <span>{correctAnswer.generation}</span>
            </div>
            <div className="space-x-2">
              <span>HT:</span>
              <span>{decimeterToImperial(correctAnswer.height)}</span>
            </div>
            <div className="space-x-2">
              <span>WT:</span>
              <span>{hectogramToImperial(correctAnswer.weight)}</span>
            </div>
          </div>
          <GameOverContent />
        </div>
      )}
    </>
  );
}
