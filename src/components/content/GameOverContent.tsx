import React from "react";
import { useAtom } from "jotai";
import { itemAtom, newGameAtom } from "@/atoms/GameAtoms";

export default function GameOverContent() {
  const [, setNewGame] = useAtom(newGameAtom);
  const [correctAnswer] = useAtom(itemAtom);
  return (
    <div>
      <h2>GameOverContent</h2>
      <p>You won or Something idk</p>
      <p>The answer was : {correctAnswer?.name}</p>
      <button onClick={() => setNewGame()}>New Game</button>
    </div>
  );
}
