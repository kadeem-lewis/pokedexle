import React from "react";
interface Props {
  title: string;
  description: string;
}
export default function GameButton({ title, description }: Props) {
  return (
    <div className="my-6 p-4 rounded-lg border-amber-300 border-4 outline-3 outline outline-current">
      <p className="text-3xl drop-shadow-md">{title}</p>
      <p className="text-2xl">{description}</p>
    </div>
  );
}
