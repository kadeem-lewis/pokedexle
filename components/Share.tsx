import React from "react";
import { useAtomValue } from "jotai";
import {
  guessedItemsAtom,
  currentGameMode,
  pokemonToGuessAtom,
  gameOverAtom,
  defaultGuesses,
  dailyAtom,
} from "@/atoms/GameAtoms";
import { Pokemon } from "@/atoms/GameAtoms";

const emojis = ["🟥", "🟩", "🔽", "🔼"];

interface ShareProps {}

const Share: React.FC<ShareProps> = () => {
  const mode = useAtomValue(currentGameMode);
  const correctAnswer = useAtomValue(pokemonToGuessAtom)[mode];
  const guesses = useAtomValue(guessedItemsAtom)[mode];
  const gameOver = useAtomValue(gameOverAtom);
  const { id } = useAtomValue(dailyAtom);

  const comparePokemonValue = (
    correctValue: number,
    guessedValue: number
  ): string => {
    if (guessedValue === correctValue) return emojis[1];
    return guessedValue < correctValue ? emojis[2] : emojis[3];
  };

  const comparePokemonTypes = (
    correctTypes: string[],
    guessedTypes: string[]
  ): string[] => {
    return guessedTypes.map((type) =>
      correctTypes.includes(type) ? emojis[1] : emojis[0]
    );
  };

  const createEmojiGrid = (): string => {
    if (!correctAnswer) return ""; // Handle null value for correctAnswer

    return guesses
      .map((guess) => {
        const generationEmoji = comparePokemonValue(
          correctAnswer.generation,
          guess.generation
        );
        const weightEmoji = comparePokemonValue(
          correctAnswer.weight,
          guess.weight
        );
        const heightEmoji = comparePokemonValue(
          correctAnswer.height,
          guess.height
        );
        const typesEmoji = comparePokemonTypes(
          correctAnswer.types,
          guess.types
        ).join("");
        return `${generationEmoji} ${typesEmoji} ${weightEmoji} ${heightEmoji} `;
      })
      .join("\n");
  };

  const handleShareClick = async (): Promise<void> => {
    const grid = createEmojiGrid();
    const turns = 6 - guesses.length;
    const textToCopy = `
Pokedexle ${mode} ${id} ${turns}/${defaultGuesses}
${grid}
${window.location.href}
    `;

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("Grid copied to clipboard successfully!");
    } catch (error) {
      alert("Failed to copy grid: " + error);
    }
  };

  // If the game is not over or if correctAnswer is null, we won't render the Share button.
  if (!gameOver || !correctAnswer) {
    return null;
  }

  return <button onClick={handleShareClick}>Share</button>;
};

export default Share;
