import LinkCard from "@/components/ui/LinkCard";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokémon",
    path: "/classic",
    background: "/svgs/endless-constellation.svg",
  },
  {
    title: "Who's that Pokémon?",
    description: "Guess the Pokémon based on the image",
    path: "/whosthatpokemon",
    background: "/svgs/hollowed-boxes.svg",
  },
];
export default function Home() {
  return (
    <>
      <h2 className="border-y-8 border-double border-y-bg-canvas bg-bg-canvas bg-opacity-20 bg-clip-padding py-2 text-center text-3xl">
        Test your Pokémon Knowledge
      </h2>
      {NAV_LINKS.map((link) => (
        <LinkCard
          title={link.title}
          description={link.description}
          path={link.path}
          background={link.background}
          key={link.title}
        />
      ))}
    </>
  );
}
