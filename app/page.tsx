import LinkCard from "@/components/ui/LinkCard";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokemon",
    path: "/classic",
    background: "",
  },
  {
    title: "Who's that Pokemon?",
    description: "Coming Soon",
    path: "/whosthatpokemon",
    background: "",
  },
  {
    title: "Move ( In Development )",
    description: "Coming Soon",
    path: "#",
    background: "",
  },
];
export default function Home() {
  return (
    <div>
      <h3 className="text-2xl">Test your Pokemon Knowledge</h3>
      {NAV_LINKS.map((link) => (
        <LinkCard
          title={link.title}
          description={link.description}
          path={link.path}
          key={link.title}
        />
      ))}
    </div>
  );
}
