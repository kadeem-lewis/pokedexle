import { Item, Pokemon } from "@/atoms/GameAtoms";
import PokemonFeedback from "./PokemonFeedback";

export default async function Gamebox({ itemArray }: { itemArray: Pokemon[] }) {
  const itemNumber = Math.floor(Math.random() * itemArray.length) + 1;
  const chosenItem = itemArray[itemNumber];
  //TODO add functionality to start a new game
  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  return (
    <div>
      <PokemonFeedback correctAnswer={chosenItem} />
    </div>
  );
}
