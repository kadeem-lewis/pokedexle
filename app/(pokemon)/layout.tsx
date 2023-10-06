import OptionsBar from "@/components/layout/OptionsBar";
export const metadata = {
  title: "Pokedexle",
};
export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OptionsBar />
      <div>{children}</div>
    </>
  );
}
