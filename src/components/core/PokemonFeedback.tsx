"use client";
import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { guessAtom, guessedItemsAtom, itemAtom, Pokemon } from "@/stores/Store";
import FeedbackTile from "./FeedbackTile";

export default function PokemonFeedback({
  correctAnswer,
}: {
  correctAnswer: Pokemon;
}) {
  const [item, setItem] = useAtom(itemAtom);

  const [guesses, setGuesses] = useAtom(guessAtom);
  const guessedItems = useAtomValue(guessedItemsAtom);
  console.log("Feedback rerendered");
  console.log(correctAnswer);
  console.log(guessedItems);

  const feedbackStatements = guessedItems.map((guessedItem) => (
    <FeedbackTile
      guessedItem={guessedItem}
      key={guessedItem.name}
      correctItem={correctAnswer}
    />
  ));
  return (
    <div className="grid grid-cols-6">
      <div>Name</div>
      <div>Type 1</div>
      <div>Type 2</div>
      <div>Generation</div>
      <div>Weight</div>
      <div>Height</div>
      {feedbackStatements}
    </div>
  );
}
