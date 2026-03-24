import DailyGame from "./_components/DailyGame";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

export default async function WhosThatPokemon() {
  return <DailyGame />;
}
