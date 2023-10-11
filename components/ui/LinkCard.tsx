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
      className="my-6 p-4 rounded-lg text-white border-amber-300 border-4 outline-3 outline outline-black dark:outline-white dark:border-amber"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Link href={path}>
        <p className="text-3xl drop-shadow-md uppercase text-shadow">{title}</p>
        <p className="text-2xl text-shadow">{description}</p>
      </Link>
    </div>
  );
}
