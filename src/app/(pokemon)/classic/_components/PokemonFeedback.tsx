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
import GameOverContent from "@/app/(pokemon)/_components/content/GameOver";

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
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const [gameOver, setGameOver] = useAtom(gameOverAtom);

  //TODO: Maybe this could become a custom hook
  useEffect(() => {
    if (
      guesses <= 0 ||
      guessedItems.some((item) => item.name === pokemonToGuess?.name)
    ) {
      setGameOver((prev) => ({ ...prev, [mode]: true }));
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
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className=" grid w-[140%] grid-cols-6 justify-center gap-x-1 gap-y-2 capitalize md:-ml-[15%] md:w-[130%]">
            {guessedItems.length !== 0 &&
              HEADINGS.map((heading) => (
                <div
                  key={heading}
                  className="basis-1/6 text-center font-medium uppercase"
                >
                  {heading}
                </div>
              ))}
            {feedbackStatements}
          </div>
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
