"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  classicGameOver,
  currentGameMode,
  gameOverAtom,
  guessAtom,
  guessedItemsAtom,
  Pokemon,
} from "@/atoms/GameAtoms";
import FeedbackTile from "./FeedbackTile";
import OptionsModal from "../ui/OptionsModal";
import GameOverContent from "../content/GameOverContent";
import Guesses from "./Guesses";

const HEADINGS = ["Name", "Gen", "Type 1", "Type 2", "Weight", "Height"];

export default function PokemonFeedback({
  correctAnswer,
}: {
  correctAnswer: Pokemon;
}) {
  const mode = useAtomValue(currentGameMode);

  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  console.log("Correct Answer:", mode, correctAnswer);
  const [gameOverClick, setGameOverClick] = useState(false);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const setClassicGameOver = useSetAtom(classicGameOver);

  useEffect(() => {
    if (guesses <= 0) {
      setGameOver((prev) => ({ ...prev, [mode]: true }));
    } else {
      setGameOver((prev) => ({ ...prev, [mode]: false }));
      if (mode === "classic") setClassicGameOver(true);
    }
  }, [guesses, mode, setClassicGameOver, setGameOver]);
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
      <div className="flex flex-col gap-y-2 gap-x-1 overflow-x-auto capitalize justify-center w-full max-w-2xl">
        {/* TODO: center headings for grid */}
        {guessedItems.length !== 0 && (
          <div className="flex">
            {HEADINGS.map((heading) => (
              <div
                key={heading}
                className="text-center basis-1/6 font-medium uppercase"
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
