import GameWrapper from "@/app/(pokemon)/_components/GameWrapper";
import pokedex from "@/data/pokedex.json";
import UnlimitedGame from "../_components/UnlimitedGame";

export default function Unlimited() {
  return (
    <>
      <GameWrapper pokedex={pokedex}>
        <UnlimitedGame />
      </GameWrapper>
    </>
  );
}
