import GameButton from "@/components/GameButton";
import Link from "next/link";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokemon",
    path: "/classic",
    icon: "",
  },
  {
    title: "Move",
    description: "Guess the Move",
    path: "/move",
    icon: "",
  },
];
export default function Home() {
  return (
    <div>
      {/* Need to create pages array and map them to page card */}
      <h3 className="text-2xl">Test your Pokemon Knowledge</h3>
      {NAV_LINKS.map((link) => (
        <Link href={link.path} key={link.title}>
          <GameButton title={link.title} description={link.description} />
        </Link>
      ))}
    </div>
  );
}
