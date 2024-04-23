import {
  pokemonToGuessAtom,
  classicPracticeAnswersAtom,
  classicPracticeSolutionAtom,
  guessedItemsAtom,
  guessAtom,
  currentGameMode,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import PokemonFeedback from "./PokemonFeedback";

export default function UnlimitedGame() {
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [classicPracticeSolution, setClassicPracticeSolution] = useAtom(
    classicPracticeSolutionAtom,
  );
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const mode = useAtomValue(currentGameMode);

  useEffect(() => {
    console.log("Classic Unlimited useEffect is running");
    if (
      classicPracticeAnswers !== null &&
      mode === "classicUnlimited" &&
      guessedItems.classicUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        classicUnlimited: classicPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classicUnlimited: defaultGuesses - classicPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    classicPracticeAnswers,
    setGuessedItems,
    setGuesses,
    guessedItems.classicUnlimited,
  ]);

  useEffect(() => {
    if (mode === "classicUnlimited" && classicPracticeSolution === null) {
      setClassicPracticeSolution(pokemonToGuess.classicUnlimited);
    }
  }, [
    classicPracticeSolution,
    mode,
    pokemonToGuess.classicUnlimited,
    pokemonToGuess.whosthatpokemonUnlimited,
    setClassicPracticeSolution,
  ]);

  return pokemonToGuess.classicUnlimited ? (
    <PokemonFeedback correctAnswer={pokemonToGuess.classicUnlimited} />
  ) : null;
}
