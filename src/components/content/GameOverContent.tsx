import React from "react";
import { useSetAtom } from "jotai";
import { newGameAtom } from "@/atoms/GameAtoms";

export default function GameOverContent() {
  const newGame = useSetAtom(newGameAtom);

  return (
    <div>
      <h2>GameOverContent</h2>
      <p>You won or Something idk</p>
      <button onClick={() => newGame}>New Game</button>
    </div>
  );
}
