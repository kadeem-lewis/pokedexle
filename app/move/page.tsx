import Gamebox from "@/components/move/Gamebox";
import OptionsBar from "../../components/layout/OptionsBar";
import { Move } from "@/atoms/GameAtoms";
import fs from "fs/promises";

export const metadata = {
  title: "Move",
};

async function readMovedex():Promise<Move[]>{
  try {
    const data = await fs.readFile(`${process.cwd()}/data/movedex.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Move() {
  const moveList = await readMovedex();
  return (
    <div>
      <OptionsBar />
      {moveList && <Gamebox moveList={moveList} />}
    </div>
  );
}
