import DailyGame from "./_components/DailyGame";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  return <DailyGame />;
}
