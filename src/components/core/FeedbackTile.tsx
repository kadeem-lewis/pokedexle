import { Item, Pokemon } from "@/stores/Store";
import React from "react";
import Image from "next/image";
interface Props {
  guessedItem: Item;
  correctItem: Pokemon;
}
export default function FeedbackTile({ guessedItem, correctItem }: Props) {
  //generates a new grid item with if the item was correct, higher or lower than the correct value
  return (
    <>
      <div className="border-2 border-current p-2">{guessedItem.name}</div>
      <div className="border-2 border-current p-2">
        {10 <= correctItem.height ? "higher" : "lower"}
      </div>
      <div className="border-2 border-current p-2">
        {(correctItem.types[0] = "fire" ? "X" : "O")}
      </div>
      <div className="border-2 border-current p-2">
        {(correctItem.types[0] = "water" ? "X" : "O")}
      </div>
      <div className="border-2 border-current p-2">
        {(correctItem.generation = "1" ? "OG" : "L")}
      </div>
      <div className="border-2 border-current p-2">
        <Image
          src={correctItem.sprite}
          height={64}
          width={64}
          alt={`${correctItem.name} sprite`}
        />
      </div>
    </>
  );
}
