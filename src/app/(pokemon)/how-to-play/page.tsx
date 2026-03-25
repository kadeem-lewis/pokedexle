import HowToPlayContent from "./HowToPlay";
import pokedex from "@/data/pokedex.json";

export default function HowToPlay() {
  return <HowToPlayContent pokedex={pokedex} />;
}
