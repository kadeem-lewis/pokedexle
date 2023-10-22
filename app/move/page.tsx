import Gamebox from "@/components/move/Gamebox";
import OptionsBar from "../../components/layout/OptionsBar";
import { Move } from "@/atoms/GameAtoms";
import fs from "fs/promises";
import { readJson } from "@/helpers/FileSystem";

export const metadata = {
  title: "Move",
};

export default async function Move() {
  const moveList = (await readJson(
    `${process.cwd()}/data/movedex.json`,
  )) as Move[];
  return (
    <div>
      <OptionsBar />
      {moveList && <Gamebox moveList={moveList} />}
    </div>
  );
}
