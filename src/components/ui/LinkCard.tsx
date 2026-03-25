import { Route } from "next";
import Link from "next/link";
type LinkCardProps = {
  title: string;
  description: string;
  path: string;
  background: string;
};
export default function LinkCard({
  title,
  description,
  path,
  background,
}: LinkCardProps) {
  return (
    <div
      className="my-6 transform rounded-lg border-4 border-amber-300 text-white outline-3 outline-black transition duration-200 ease-in-out hover:scale-105 motion-reduce:transition-none dark:border-amber-500 dark:outline-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="h-full w-full bg-white/10 p-4">
        <Link href={path as Route}>
          <p className="text-shadow text-3xl uppercase drop-shadow-md">
            {title}
          </p>
          <p className="text-shadow text-2xl">{description}</p>
        </Link>
      </div>
    </div>
  );
}
