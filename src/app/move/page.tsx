import Gamebox from "@/components/move/Gamebox";
import OptionsBar from "../../components/layout/OptionsBar";
import { Move } from "@/atoms/GameAtoms";
import { readJson } from "@/helpers/FileSystem";
import ModeSwitch from "@/components/ModeSwitch";
import MoveCombobox from "@/components/move/MoveCombobox";

type MoveProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Move",
};

export default async function Move({ searchParams }: MoveProps) {
  const moveList = (await readJson("/data/movedex.json")) as Move[];
  return (
    <>
      <OptionsBar />
      <ModeSwitch href="/move" searchParams={searchParams} />
      {moveList && <Gamebox moveList={moveList} />}
      <MoveCombobox />
    </>
  );
}
