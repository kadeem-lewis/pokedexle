import OptionsBar from "@/components/layout/OptionsBar";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OptionsBar />
      {children}
    </>
  );
}
