"use client";
import { cx } from "tailwind-variants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "next";

export default function ModeSwitch() {
  const pathname = usePathname();
  const isUnlimited = pathname.endsWith("/unlimited");

  const basePath = isUnlimited
    ? pathname.replace(/\/unlimited$/, "")
    : pathname;

  return (
    <div className="mt-2 flex justify-center gap-2">
      <Link
        className={cx(
          !isUnlimited ? "brightness-110" : "brightness-75",
          "focus-visible:ring-ring inline-flex items-center justify-center border-2 border-white px-px py-0.5 text-white uppercase outline outline-black transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",

          "bg-yellow-500 hover:brightness-110",
        )}
        href={basePath as Route}
      >
        Daily
      </Link>
      <Link
        className={cx(
          isUnlimited ? "brightness-110" : "brightness-75",
          "focus-visible:ring-ring inline-flex items-center justify-center border-2 border-white px-px py-0.5 text-white uppercase outline outline-black transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",

          "bg-yellow-500 hover:brightness-110",
        )}
        href={`${basePath}/unlimited` as Route}
      >
        Unlimited
      </Link>
    </div>
  );
}
