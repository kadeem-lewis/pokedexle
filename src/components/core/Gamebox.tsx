import { Item, Pokemon } from "@/stores/Store";
import PokemonFeedback from "./PokemonFeedback";

export default async function Gamebox({ itemArray }: { itemArray: Pokemon[] }) {
  const itemNumber = Math.floor(Math.random() * itemArray.length) + 1;
  const chosenItem = itemArray[itemNumber];

  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  return (
    <div>
      <PokemonFeedback correctAnswer={chosenItem} />
    </div>
  );
}
