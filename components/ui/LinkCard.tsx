import React from "react";
import Link from "next/link";
interface Props {
  title: string;
  description: string;
  path: string;
  background: string;
}
export default function LinkCard({
  title,
  description,
  path,
  background,
}: Props) {
  return (
    <div
      className="my-6  rounded-lg text-white border-amber-300 border-4 outline-3 outline outline-black dark:outline-white dark:border-amber-500"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full h-full bg-white/20 p-4">
        <Link href={path}>
          <p className="text-3xl drop-shadow-md uppercase text-shadow">
            {title}
          </p>
          <p className="text-2xl text-shadow">{description}</p>
        </Link>
      </div>
    </div>
  );
}
