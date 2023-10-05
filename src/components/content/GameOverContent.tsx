import React from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { pokemonToGuessAtom, newGameAtom } from "@/atoms/GameAtoms";
import Image from "next/image";

export default function GameOverContent() {
  const [, setNewGame] = useAtom(newGameAtom);
  const correctAnswer = useAtomValue(pokemonToGuessAtom);
  return (
    <div>
      <h2>GameOverContent</h2>
      <p>You won or Something idk</p>
      <Image
        src={correctAnswer?.sprite as string}
        alt={`${correctAnswer?.name} sprite`}
        width={200}
        height={200}
      />
      <p>The answer was : {correctAnswer?.name}</p>
      <button onClick={() => setNewGame()}>New Game</button>
    </div>
  );
}
