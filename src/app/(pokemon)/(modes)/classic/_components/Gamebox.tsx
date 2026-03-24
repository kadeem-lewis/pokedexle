"use client";
import { useSearchParams } from "next/navigation";
import DailyGame from "./DailyGame";
import UnlimitedGame from "./UnlimitedGame";

export default function Gamebox() {
  const searchParams = useSearchParams();

  return (
    <>
      {!searchParams.has("mode") && <DailyGame />}
      {searchParams.get("mode") === "unlimited" && <UnlimitedGame />}
    </>
  );
}
