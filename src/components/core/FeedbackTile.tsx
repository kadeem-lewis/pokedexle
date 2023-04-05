import { Item, Pokemon } from "@/atoms/GameAtoms";
import React from "react";
import Image from "next/image";
interface Props {
  guessedItem: Pokemon;
  correctItem: Pokemon;
}
export default function FeedbackTile({ guessedItem, correctItem }: Props) {
  //generates a new grid item with if the item was correct, higher or lower than the correct value
  return (
    <>
      {guessedItem.name === correctItem.name ? (
        <>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.name}
          </div>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.generation}
          </div>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.types[0]}
          </div>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.types[1] !== null ? correctItem.types[1] : "none"}
          </div>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.weight}
          </div>
          <div className="border-2 border-current p-2 bg-green-400">
            {correctItem.height}
          </div>
        </>
      ) : (
        <>
          <div className="border-2 border-current p-2">{guessedItem.name}</div>
          <div className="border-2 border-current p-2">
            {correctItem.generation > guessedItem.generation
              ? "Higher"
              : "Lower"}
          </div>
          <div className="border-2 border-current p-2">
            {(correctItem.types[0] = "fire" ? "X" : "O")}
          </div>
          <div className="border-2 border-current p-2">
            {(correctItem.types[0] = "water" ? "X" : "O")}
          </div>
          <div className="border-2 border-current p-2">
            {correctItem.weight < guessedItem.weight ? "Higher" : "Lower"}
          </div>
          <div className="border-2 border-current p-2">
            {correctItem.height < guessedItem.height ? "Higher" : "Lower"}
          </div>
        </>
      )}
    </>
  );
}
