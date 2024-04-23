import React, { useEffect } from "react";
import ImagePanel from "./ImagePanel";
import {
  currentGameMode,
  pokemonToGuessAtom,
  whosthatpokemonPracticeAnswersAtom,
  whosthatpokemonPracticeSolutionAtom,
  guessedItemsAtom,
  guessAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import { useAtomValue, useAtom, useSetAtom } from "jotai";

export default function UnlimitedGame() {
  const mode = useAtomValue(currentGameMode);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const whosthatpokemonPracticeAnswers = useAtomValue(
    whosthatpokemonPracticeAnswersAtom,
  );
  const [whosthatpokemonPracticeSolution, setWhosthatpokemonPracticeSolution] =
    useAtom(whosthatpokemonPracticeSolutionAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);

  useEffect(() => {
    if (
      whosthatpokemonPracticeAnswers !== null &&
      mode === "whosthatpokemonUnlimited" &&
      guessedItems.whosthatpokemonUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemonUnlimited: whosthatpokemonPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemonUnlimited:
          defaultGuesses - whosthatpokemonPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    setGuessedItems,
    setGuesses,
    guessedItems.whosthatpokemonUnlimited,
    whosthatpokemonPracticeAnswers,
  ]);

  useEffect(() => {
    if (
      mode === "whosthatpokemonUnlimited" &&
      whosthatpokemonPracticeSolution === null
    ) {
      setWhosthatpokemonPracticeSolution(
        pokemonToGuess.whosthatpokemonUnlimited,
      );
    }
  }, [
    mode,
    pokemonToGuess.whosthatpokemonUnlimited,
    setWhosthatpokemonPracticeSolution,
    whosthatpokemonPracticeSolution,
  ]);
  return (
    pokemonToGuess.whosthatpokemonUnlimited && (
      <ImagePanel correctAnswer={pokemonToGuess.whosthatpokemonUnlimited} />
    )
  );
}
