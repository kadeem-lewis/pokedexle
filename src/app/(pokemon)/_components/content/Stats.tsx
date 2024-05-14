"use client";
import {
  classicAnswersAtom,
  whosthatpokemonAnswersAtom,
} from "@/atoms/GameAtoms";
import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import React from "react";

export default function StatsContent() {
  const classicAnswers = useAtomValue(classicAnswersAtom);
  const whosthatpokemonAnswers = useAtomValue(whosthatpokemonAnswersAtom);

  const pathname = usePathname();

  const stats =
    pathname === "/classic"
      ? { name: "Classic", ...classicAnswers.stats }
      : pathname === "/whosthatpokemon"
        ? { name: "Who's that Pokemon", ...whosthatpokemonAnswers.stats }
        : {
            plays: 0,
            wins: 0,
            streak: 0,
            name: "Unknown",
            maxStreak: 0,
            guesses: [0, 0, 0, 0, 0, 0],
          };

  const data = stats.guesses.map((guess, index) => ({
    name: String(index + 1),
    value: guess,
  }));

  return (
    <>
      <p className="text-2xl font-semibold">{stats.name} Stats</p>
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
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" />
            <Bar
              dataKey="value"
              fill="#8884d8"
              label={{ fill: "white", fontWeight: "bold" }}
              minPointSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
