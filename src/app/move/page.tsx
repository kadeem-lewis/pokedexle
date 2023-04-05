import OptionsBar from "@/components/layout/OptionsBar";
import MyComboBox from "@/components/ui/MyComboBox";

import { Item } from "@/atoms/GameAtoms";
async function getMoveList() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/move?limit=100000&offset=0"
    );
    const moveData = await res.json();
    return moveData.results;
  } catch (err) {
    console.error(err);
  }
}
export default async function Move() {
  const moveList = await getMoveList();
  return (
    <div>
      <OptionsBar />
      <MyComboBox data={moveList} />
    </div>
  );
}
