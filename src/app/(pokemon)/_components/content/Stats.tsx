"use client";
import React from "react";

export default function StatsContent() {
  return (
    <>
      <div className="mb-4 grid grid-cols-6 text-center text-xl">
        <div className="col-span-2">
          <div>0</div>
          <div>Played</div>
        </div>
        <div className="col-span-2">
          <div>0</div>
          <div>Won</div>
        </div>
        <div className="col-span-2">
          <div>0.00</div>
          <div>Win %</div>
        </div>
        <div className="col-span-3">
          <div>0</div>
          <div>Current Streak</div>
        </div>
        <div className="col-span-3">
          <div>0</div>
          <div>Max Streak</div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold">Guess Distribution</p>
      </div>
    </>
  );
}
