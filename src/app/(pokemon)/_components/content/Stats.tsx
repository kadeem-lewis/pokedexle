"use client";
import {
  classicAnswersAtom,
  whosthatpokemonAnswersAtom,
} from "@/atoms/GameAtoms";
import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import React from "react";

export default function StatsContent() {
  const classicAnswers = useAtomValue(classicAnswersAtom);
  const whosthatpokemonAnswers = useAtomValue(whosthatpokemonAnswersAtom);

  const pathname = usePathname();
  console.log(pathname);

  const stats =
    pathname === "/classic"
      ? { name: "Classic", ...classicAnswers.stats }
      : pathname === "/whosthatpokemon"
        ? { name: "Who's that Pokemon", ...whosthatpokemonAnswers.stats }
        : { plays: 0, wins: 0, streak: 0, name: "Unknown", maxStreak: 0 };

  return (
    <>
      <p className="text-2xl font-semibold">{stats.name}</p>
      <div className="mb-4 grid grid-cols-6 text-center text-xl">
        <div className="col-span-2">
          <div>{stats.plays}</div>
          <div>Played</div>
        </div>
        <div className="col-span-2">
          <div>{stats.wins}</div>
          <div>Won</div>
        </div>
        <div className="col-span-2">
          <div>
            {stats.plays === 0
              ? "0.00"
              : ((stats.wins / stats.plays) * 100).toFixed(2)}
          </div>
          <div>Win %</div>
        </div>
        <div className="col-span-3">
          <div>{stats.streak}</div>
          <div>Current Streak</div>
        </div>
        <div className="col-span-3">
          <div>{stats.maxStreak}</div>
          <div>Max Streak</div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold">Guess Distribution</p>
        {/* TODO: Add a radar chart or a bar chart from recharts */}
      </div>
    </>
  );
}
