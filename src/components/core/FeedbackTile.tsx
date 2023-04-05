import { Item, Pokemon } from "@/atoms/GameAtoms";
import React from "react";
import { useSetAtom } from "jotai";
import { guessAtom } from "@/atoms/GameAtoms";
import Image from "next/image";
interface Props {
  guessedItem: Pokemon;
  correctItem: Pokemon;
}
export default function FeedbackTile({ guessedItem, correctItem }: Props) {
  const setGuesses = useSetAtom(guessAtom);
  function correctGuess() {
    //Set game over true
    return (
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
          {correctItem.types[1]}
        </div>
        <div className="border-2 border-current p-2 bg-green-400">
          {correctItem.weight}
        </div>
        <div className="border-2 border-current p-2 bg-green-400">
          {correctItem.height}
        </div>
      </>
    );
  }
  function incorrectGuess() {
    //setGuesses(7);
    return (
      <>
        <div className="border-2 border-current p-2">{guessedItem.name}</div>
        <div className="border-2 border-current">{checkGeneration()}</div>
        {guessedItem.types.map((type) => (
          <div key={type} className="border-2 border-current">
            {checkTypes(type)}
          </div>
        ))}
        <div className="border-2 border-current">{checkWeight()}</div>
        <div className="border-2 border-current">{checkHeight()}</div>
      </>
    );
  }
  function checkGeneration() {
    if (guessedItem.generation === correctItem.generation) {
      return (
        <div className="bg-green-400 p-2">Gen {correctItem.generation}</div>
      );
    } else if (guessedItem.generation < correctItem.generation) {
      return <div className="bg-red-400 p-2">higher</div>;
    } else if (guessedItem.generation > correctItem.generation) {
      return <div className="bg-red-400 p-2">lower</div>;
    }
  }
  function checkWeight() {
    if (guessedItem.weight === correctItem.weight) {
      return (
        <div className="bg-green-400 p-2">{correctItem.weight / 10}kg</div>
      );
    } else if (guessedItem.weight > correctItem.weight) {
      return <div className="bg-red-400 p-2">higher</div>;
    } else if (guessedItem.weight < correctItem.weight) {
      return <div className="bg-red-400 p-2">lower</div>;
    }
  }
  function checkHeight() {
    if (guessedItem.height === correctItem.height) {
      return <div className="bg-green-400 p-2">{correctItem.height / 10}m</div>;
    } else if (guessedItem.height > correctItem.height) {
      return <div className="bg-red-400 p-2">higher</div>;
    } else if (guessedItem.height < correctItem.height) {
      return <div className="bg-red-400 p-2">lower</div>;
    }
  }
  function checkTypes(type: string): JSX.Element {
    if (correctItem.types.includes(type)) {
      return <div className="bg-green-400 p-2">{type}</div>;
    }
    return <div className="bg-red-400 p-2">{type}</div>;
  }
  //generates a new grid item with if the item was correct, higher or lower than the correct value
  return (
    <>
      {guessedItem.name === correctItem.name
        ? correctGuess()
        : incorrectGuess()}
    </>
  );
}
