import React from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import {
  pokemonToGuessAtom,
  newGameAtom,
  currentGameMode,
  guessAtom,
} from "../../atoms/GameAtoms";
import Image from "next/image";

export default function GameOverContent() {
  const [mode, setMode] = useAtom(currentGameMode);
  const setNewGame = useSetAtom(newGameAtom);
  const guesses = useAtomValue(guessAtom)[mode];
  const pokemonGuesses = useAtomValue(pokemonToGuessAtom);
  const correctAnswer = pokemonGuesses[mode];
  return (
    <div>
      <div className="text-3xl">
        {guesses > 0 ? (
          <p>You won!!</p>
        ) : (
          <p>You Lost. Better luck Next Time!</p>
        )}
      </div>

      {correctAnswer && (
        <div className="flex justify-center flex-col items-center">
          <Image
            src={correctAnswer.sprite}
            alt={`${correctAnswer.name} sprite`}
            width={200}
            height={200}
          />
          <p className="text-2xl">The answer was : {correctAnswer.name}</p>
        </div>
      )}
      {mode === "classicUnlimited" ? (
        <div className="flex gap-4 justify-center text-2xl">
          <span>Wanna try again?</span>
          <button onClick={() => setNewGame()}>New Game</button>
        </div>
      ) : (
        <p>New Game soon</p>
      )}
    </div>
  );
}
