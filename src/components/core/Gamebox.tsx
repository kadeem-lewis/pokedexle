import { Item, Pokemon } from "@/stores/Store";
import PokemonFeedback from "./PokemonFeedback";

async function getPokemonStats(url: string): Promise<Pokemon> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const res2 = await fetch(data.species.url);
    const data2 = await res2.json();
    const generation = data2.generation.name;
    return {
      name: data.name,
      types: data.types,
      weight: data.weight,
      height: data.height,
      generation,
      sprite: data.sprites.front_default,
    };
  } catch (e) {
    throw e;
  }
}
export default async function Gamebox({ itemArray }: { itemArray: Item[] }) {
  // const [item, setItem] = useAtom(itemAtom);
  // const [guesses, setGuesses] = useAtom(guessAtom);

  const itemNumber = Math.floor(Math.random() * itemArray.length) + 1;
  const chosenItem = itemArray[itemNumber];
  const chosenItemData: Pokemon = await getPokemonStats(chosenItem.url);

  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  return (
    <div>
      <PokemonFeedback correctAnswer={chosenItemData} />
    </div>
  );
}
