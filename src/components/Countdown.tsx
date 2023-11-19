"use client";
import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

type CountdownProps = {
  targetDate: Date;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);

      if (newTimeLeft <= 0) {
        clearInterval(intervalId);
      }

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  function calculateTimeLeft(endDate: Date): number {
    const now = new Date();
    return differenceInSeconds(endDate, now);
  }

  function formatTimeLeft(timeLeftInSeconds: number): string {
    const hours = Math.floor(timeLeftInSeconds / 3600);
    let remaining = timeLeftInSeconds % 3600;

    const minutes = Math.floor(remaining / 60);
    remaining = remaining % 60;

    const seconds = remaining;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      {timeLeft <= 0 ? (
        <p>Time&apos;s up!</p>
      ) : (
        <span className="text-3xl">{formatTimeLeft(timeLeft)}</span>
      )}
    </div>
  );
}
