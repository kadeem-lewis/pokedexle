"use client";
import { cx } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/Button";
import { useSearchParams } from "next/navigation";

type ModeSwitchProps = {
  href: string;
};

export default function ModeSwitch({ href }: ModeSwitchProps) {
  const searchParams = useSearchParams();
  return (
    <div className="mt-2 flex justify-center gap-2">
      <Link
        className={cx(
          !searchParams.get("mode") ? "brightness-110" : "brightness-75",
          buttonVariants({ variant: "flat", size: "tall" }),
          "bg-yellow-500",
        )}
        href={href}
      >
        Daily
      </Link>
      <Link
        className={cx(
          searchParams.get("mode") === "unlimited"
            ? "brightness-110"
            : "brightness-75",
          buttonVariants({ variant: "flat", size: "tall" }),
          "bg-yellow-500",
        )}
        href="?mode=unlimited"
      >
        Unlimited
      </Link>
    </div>
  );
}
