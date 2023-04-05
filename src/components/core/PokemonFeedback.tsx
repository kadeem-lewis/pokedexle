"use client";
import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  guessAtom,
  guessedItemsAtom,
  itemAtom,
  Pokemon,
} from "@/atoms/GameAtoms";
import FeedbackTile from "./FeedbackTile";

export default function PokemonFeedback({
  correctAnswer,
}: {
  correctAnswer: Pokemon;
}) {
  const guesses = useAtomValue(guessAtom);
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
    <>
      <div className="text-center">Guesses={guesses}</div>
      <div className="grid grid-cols-6 gap-y-2 capitalize">
        {guessedItems.length !== 0 ? (
          <>
            <div>Name</div>
            <div>Gen</div>
            <div>Type 1</div>
            <div>Type 2</div>
            <div>Weight</div>
            <div>Height</div>
          </>
        ) : (
          ""
        )}
        {feedbackStatements}
      </div>
    </>
  );
}
