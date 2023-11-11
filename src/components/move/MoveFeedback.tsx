"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  currentGameMode,
  gameOverAtom,
  guessAtom,
  guessedItemsAtom,
  Move,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import FeedbackTile from "./FeedbackTile";
import OptionsModal from "../ui/OptionsModal";
import GameOverContent from "../content/GameOverContent";
import Guesses from "@/components/Guesses";

type MoveFeedbackProps = {
  correctAnswer: Move;
};

const HEADINGS = ["Name", "Gen", "Class", "Type", "Power", "PP", "Accuracy"];

export default function PokemonFeedback({ correctAnswer }: MoveFeedbackProps) {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  const guesses = useAtomValue(guessAtom)[mode];
  //TODO: find a better way to result the pokemon[] or move[] error
  const guessedItems = useAtomValue(guessedItemsAtom)[mode] as Move[];
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
      <Guesses />
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