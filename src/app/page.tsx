import LinkCard from "@/components/ui/LinkCard";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokémon",
    path: "/classic",
    background: "images/endless-constellation.svg",
  },
  {
    title: "Who's that Pokémon?",
    description: "Guess the Pokémon based on the image",
    path: "/whosthatpokemon",
    background: "/images/hollowed-boxes.svg",
  },
];
export default function Home() {
  return (
    <div>
      <h2 className="text-3xl">Test your Pokémon Knowledge</h2>
      {NAV_LINKS.map((link) => (
        <LinkCard
          title={link.title}
          description={link.description}
          path={link.path}
          background={link.background}
          key={link.title}
        />
      ))}
    </div>
  );
}
