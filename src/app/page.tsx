import GameButton from "@/components/buttons/GameButton";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokemon",
    path: "/classic",
    background: "",
  },
  {
    title: "Move ( In Development )",
    description: "Coming Soon",
    path: "#",
    background: "",
  },
  {
    title: "Who's that Pokemon?",
    description: "Coming Soon",
    path: "#",
    background: "",
  },
];
export default function Home() {
  return (
    <div>
      {/* Need to create pages array and map them to page card */}
      <h3 className="text-2xl">Test your Pokemon Knowledge</h3>
      {NAV_LINKS.map((link) => (
        <GameButton
          title={link.title}
          description={link.description}
          path={link.path}
          key={link.title}
        />
      ))}
    </div>
  );
}
