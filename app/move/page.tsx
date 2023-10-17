import Gamebox from "@/components/move/Gamebox";
import OptionsBar from "../../components/layout/OptionsBar";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Move",
};

export default async function Move() {
  const moveList = await prisma.move.findMany();
  return (
    <div>
      <OptionsBar />
      {moveList && <Gamebox moveList={moveList} />}
    </div>
  );
}
