import { useEffect } from "react";
import { Pokemon } from "../../atoms/GameAtoms";
import { useSetAtom, useAtom } from "jotai";
import { guessAtom, gameOverAtom } from "../../atoms/GameAtoms";
import Image from "next/image";

interface Props {
  guessedItem: Pokemon;
  correctItem: Pokemon;
}
export default function FeedbackTile({ guessedItem, correctItem }: Props) {
  const setGuesses = useSetAtom(guessAtom);
  const setGameOver = useSetAtom(gameOverAtom);
  //this could potentially be running twice which causes guesses to decrement by 2
  //this could also be what is potentially causing decrements on changing tabs since useEffect could be rerunning?
  useEffect(() => {
    if (guessedItem.name !== correctItem.name) {
      setGuesses((guess: number) => guess - 1);
    } else {
      setGameOver(true);
    }
  }, [guessedItem, correctItem, setGuesses, setGameOver]); //?something here might be updating and causing render?

  function checkGeneration() {
    if (guessedItem.generation === correctItem.generation) {
      return (
        <div className="bg-green-400 p-2">Gen {correctItem.generation}</div>
      );
    } else if (guessedItem.generation < correctItem.generation) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-up">higher</div>
        </div>
      );
    } else if (guessedItem.generation > correctItem.generation) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-down">lower</div>
        </div>
      );
    }
  }
  function checkWeight() {
    if (guessedItem.weight === correctItem.weight) {
      return (
        <div className="bg-green-400 p-2">{correctItem.weight / 10}kg</div>
      );
    } else if (guessedItem.weight < correctItem.weight) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-up">higher</div>
        </div>
      );
    } else if (guessedItem.weight > correctItem.weight) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-down">lower</div>
        </div>
      );
    }
  }
  function checkHeight() {
    if (guessedItem.height === correctItem.height) {
      return <div className="bg-green-400 p-2">{correctItem.height / 10}m</div>;
    } else if (guessedItem.height < correctItem.height) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-up">higher</div>
        </div>
      );
    } else if (guessedItem.height > correctItem.height) {
      return (
        <div className="bg-red-400 p-2">
          <div className="arrow-down">lower</div>
        </div>
      );
    }
  }
  function checkTypes(type: string): JSX.Element {
    if (correctItem.types.includes(type)) {
      return <div className="h-full bg-green-400 p-2">{type}</div>;
    }
    return <div className="h-full bg-red-400 p-2">{type}</div>;
  }

  return (
    <>
      {guessedItem.name === correctItem.name ? (
        <>
          <div className="border-2 border-current bg-green-400 p-2">
            {correctItem.name}
          </div>
          <div className="border-2 border-current bg-green-400 p-2">
            Gen {correctItem.generation}
          </div>
          {correctItem.types.map((type) => (
            <div
              key={type}
              className="border-2 border-current bg-green-400 p-2"
            >
              {type}
            </div>
          ))}
          <div className="border-2 border-current bg-green-400 p-2">
            {correctItem.weight / 10}kg
          </div>
          <div className="border-2 border-current bg-green-400 p-2">
            {correctItem.height / 10}m
          </div>
        </>
      ) : (
        <>
          <div className="border-2 border-current p-2">
            <Image
              src={guessedItem.sprite}
              alt={`${guessedItem.name} sprite`}
              width={100}
              height={100}
            />
          </div>
          <div className="border-2 border-current">{checkGeneration()}</div>
          {guessedItem.types.map((type) => (
            <div key={type} className="border-2 border-current">
              {checkTypes(type)}
            </div>
          ))}
          <div className="border-2 border-current">{checkWeight()}</div>
          <div className="border-2 border-current">{checkHeight()}</div>
        </>
      )}
    </>
  );
}
