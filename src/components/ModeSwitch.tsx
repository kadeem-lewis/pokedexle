"use client";
import { cnBase } from "tailwind-variants";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

type ModeSwitchProps = {
  href: string;
};

export default function ModeSwitch({ href }: ModeSwitchProps) {
  const searchParams = useSearchParams();
  return (
    <div className="mt-2 flex justify-center gap-2">
      <Link
        className={cnBase(
          !searchParams.get("mode") ? "brightness-110" : "brightness-75",
          "focus-visible:ring-ring inline-flex items-center justify-center border-2 border-white px-px py-0.5 uppercase text-border text-white outline  outline-black transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",

          "bg-yellow-500 hover:brightness-110",
        )}
        href={href}
      >
        Daily
      </Link>
      <Link
        className={cnBase(
          searchParams.get("mode") === "unlimited"
            ? "brightness-110"
            : "brightness-75",
          "focus-visible:ring-ring inline-flex items-center justify-center border-2 border-white px-px py-0.5 uppercase text-border text-white outline  outline-black transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",

          "bg-yellow-500 hover:brightness-110",
        )}
        href="?mode=unlimited"
      >
        Unlimited
      </Link>
    </div>
  );
}
