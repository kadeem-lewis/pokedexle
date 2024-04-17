"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
import {
  currentGameMode,
  gameOverAtom,
  guessAtom,
  guessedItemsAtom,
  Pokemon,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import FeedbackTile from "./FeedbackTile";
import GameOverContent from "../content/GameOverContent";

type PokemonFeedbackProps = {
  correctAnswer: Pokemon;
};

export const HEADINGS = ["Name", "Gen", "Type 1", "Type 2", "Height", "Weight"];

export default function PokemonFeedback({
  correctAnswer,
}: PokemonFeedbackProps) {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  const guesses = useAtomValue(guessAtom)[mode];
  //TODO: find a better way to result the pokemon[] or error
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
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

  const feedbackStatements = useMemo(() => {
    return guessedItems.map((guessedItem) => (
      <FeedbackTile
        guessedItem={guessedItem}
        key={guessedItem.name}
        correctItem={correctAnswer}
      />
    ));
  }, [guessedItems, correctAnswer]);
  return (
    <>
      {!gameOver[mode] && (
        <div className="flex flex-col justify-center gap-x-1 gap-y-2 overflow-x-auto capitalize">
          {guessedItems.length !== 0 && (
            <div className="flex">
              {HEADINGS.map((heading) => (
                <div
                  key={heading}
                  className="basis-1/6 text-center font-medium uppercase"
                >
                  {heading}
                </div>
              ))}
            </div>
          )}
          {feedbackStatements}
        </div>
      )}
      {gameOver[mode] && pokemonToGuess && (
        <div autoFocus>
          <GameOverContent>
            <p>
              The secret answer was{" "}
              <span className=" font-bold capitalize">
                {pokemonToGuess.name}
              </span>
            </p>
            <Image
              src={pokemonToGuess.sprite}
              height={400}
              width={400}
              priority={true}
              alt={`${pokemonToGuess.name} sprite`}
            />
          </GameOverContent>
        </div>
      )}
    </>
  );
}
