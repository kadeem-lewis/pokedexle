"use client";
import React, { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  guessedItemsAtom,
  currentGameMode,
  pokemonToGuessAtom,
  gameOverAtom,
  guessAtom,
  Pokemon,
  dailyDataAtom,
} from "@/atoms/GameAtoms";
import { Button } from "./ui/Button";
import { defaultGuesses } from "@/constants";
import { Icon } from "./Icon";
import { useSearchParams } from "next/navigation";

const emojis: { [key: string]: string } = {
  incorrect: "🟥",
  correct: "🟩",
  lower: "🔽",
  higher: "🔼",
};

export default function Share() {
  const mode = useAtomValue(currentGameMode);
  const correctAnswer = useAtomValue(pokemonToGuessAtom)[
    mode
  ] as Pokemon | null;
  const attempts = useAtomValue(guessAtom)[mode];
  const guesses = useAtomValue(guessedItemsAtom)[mode];
  const gameOver = useAtomValue(gameOverAtom);
  const [{ data }] = useAtom(dailyDataAtom);
  const [isCopied, setIsCopied] = useState(false);
  const searchParams = useSearchParams();

  const comparePokemonValue = (
    correctValue: number,
    guessedValue: number,
  ): string => {
    if (guessedValue === correctValue) return emojis["correct"];
    return guessedValue < correctValue ? emojis["higher"] : emojis["lower"];
  };

  const comparePokemonTypes = (
    correctTypes: string[],
    guessedTypes: string[],
  ): string[] => {
    return guessedTypes.map((type) =>
      correctTypes.includes(type) ? emojis["correct"] : emojis["incorrect"],
    );
  };

  const encodeAnswer = (answer: Pokemon | null): string => {
    if (!answer) return "";
    return encodeURIComponent(btoa(String(answer.id)));
  };

  const createEmojiGrid = (): string => {
    if (!correctAnswer) return ""; // Handle null value for correctAnswer

    return guesses
      .map((guess) => {
        const generationEmoji = comparePokemonValue(
          correctAnswer.generation,
          guess.generation,
        );
        const weightEmoji = comparePokemonValue(
          correctAnswer.weight,
          guess.weight,
        );
        const heightEmoji = comparePokemonValue(
          correctAnswer.height,
          guess.height,
        );
        const typesEmoji = comparePokemonTypes(
          correctAnswer.types,
          guess.types,
        ).join("");
        return `${generationEmoji} ${typesEmoji} ${heightEmoji} ${weightEmoji}`;
      })
      .join("\n");
  };

  const location = searchParams.has("mode")
    ? `${window.location.href}&x=${encodeAnswer(correctAnswer)}`
    : window.location.href;

  const handleShareClick = async (): Promise<void> => {
    const grid = createEmojiGrid();
    //! Shows X/6 if answer is guessed on 6th try
    const textToCopy = `
Pokedexle ${mode} ${data?.day} ${
      attempts >= 0 && guesses.some((item) => item.name === correctAnswer?.name)
        ? `${guesses.length}/${defaultGuesses}`
        : `X/${defaultGuesses}`
    }
${grid}
${location}
    `;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      alert("Failed to copy grid: " + error);
    }
  };

  // If the game is not over or if correctAnswer is null, we won't render the Share button.
  if (!gameOver || !correctAnswer) {
    return null;
  }

  return (
    <Button onPress={handleShareClick} variant="flat" className="flex gap-2">
      {!isCopied ? (
        <>
          <Icon name="heroicons-share-solid" className="size-5" />
          Share
        </>
      ) : (
        <>
          <Icon name="pixelarticons-check" className="size-5" />
          Copied
        </>
      )}
    </Button>
  );
}
