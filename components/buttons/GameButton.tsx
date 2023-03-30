import React from "react";
import Link from "next/link";
interface Props {
  title: string;
  description: string;
  path: string;
}
export default function GameButton({ title, description, path }: Props) {
  return (
    <div className="my-6 p-4 rounded-lg border-amber-300 border-4 outline-3 outline outline-current">
      <Link href={path}>
        <p className="text-3xl drop-shadow-md">{title}</p>
        <p className="text-2xl">{description}</p>
      </Link>
    </div>
  );
}
