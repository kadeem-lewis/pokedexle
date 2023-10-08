import React from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import {
  pokemonToGuessAtom,
  newGameAtom,
  currentGameMode,
} from "../../atoms/GameAtoms";
import Image from "next/image";

export default function GameOverContent() {
  const [mode, setMode] = useAtom(currentGameMode);
  const setNewGame = useSetAtom(newGameAtom);
  const pokemonGuesses = useAtomValue(pokemonToGuessAtom);
  const correctAnswer = pokemonGuesses[mode];
  return (
    <div>
      <h2>GameOverContent</h2>
      <p>You won or Something idk</p>
      {correctAnswer && (
        <>
          <Image
            src={correctAnswer.sprite}
            alt={`${correctAnswer.name} sprite`}
            width={200}
            height={200}
          />
          <p>The answer was : {correctAnswer.name}</p>
        </>
      )}
      {mode === "classicUnlimited" ? (
        <button onClick={() => setNewGame()}>New Game</button>
      ) : (
        <p>New Game soon</p>
      )}
    </div>
  );
}
