import Gamebox from "@/components/core/Gamebox";

export const metadata = {
  title: "Pokedexle | Classic",
  description: "Guess Pokemon based on hints from previous guesses",
};

async function getPokedex() {
  const response = await fetch("/api/pokemon");

  if (!response.ok) throw new Error("Failed to fetch data");

  return response.json();
}

export default async function Classic() {
  const pokedex = await getPokedex();
  return <div>{pokedex && <Gamebox pokedex={pokedex} />}</div>;
}
