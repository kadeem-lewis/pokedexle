"use client";
import { useSearchParams } from "next/navigation";

import UnlimitedGame from "./UnlimitedGame";
import DailyGame from "./DailyGame";

export default function Gamebox() {
  const searchParams = useSearchParams();

  return (
    <>
      {!searchParams.has("mode") && <DailyGame />}
      {searchParams.get("mode") === "unlimited" && <UnlimitedGame />}
    </>
  );
}
