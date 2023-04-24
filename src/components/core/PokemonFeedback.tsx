"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  gameOverAtom,
  guessAtom,
  guessedItemsAtom,
  itemAtom,
  Pokemon,
} from "@/atoms/GameAtoms";
import FeedbackTile from "./FeedbackTile";
import OptionsModal from "../ui/OptionsModal";
import GameOverContent from "../content/GameOverContent";

export default function PokemonFeedback({
  correctAnswer,
}: {
  correctAnswer: Pokemon;
}) {
  const guesses = useAtomValue(guessAtom);
  const guessedItems = useAtomValue(guessedItemsAtom);
  const setAnswer = useSetAtom(itemAtom);
  console.log(correctAnswer);
  const [gameOverClick, setGameOverClick] = useState(false);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  useEffect(() => {
    if (guesses <= 0) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [guesses, setGameOver]);
  useEffect(() => {
    if (gameOver) {
      setGameOverClick(true);
    }
  }, [gameOver]);
  useEffect(() => {
    setAnswer(correctAnswer);
  }, [setAnswer, correctAnswer]);
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
      <div className="text-center">Guesses={guesses}</div>
      <div className="grid grid-cols-6 gap-y-2 overflow-x-auto capitalize">
        {guessedItems.length !== 0 && (
          <>
            <div>Name</div>
            <div>Gen</div>
            <div>Type 1</div>
            <div>Type 2</div>
            <div>Weight</div>
            <div>Height</div>
          </>
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
