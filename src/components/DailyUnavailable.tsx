import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { usePathname } from "next/navigation";

export default function DailyUnavailable() {
  const pathname = usePathname();
  return (
    <div className="flex h-40 flex-col items-center justify-center">
      <p className="text-center text-3xl font-bold uppercase">
        Daily Mode is currently unavailable. Check back tomorrow
      </p>
      <p>or</p>
      <Link
        href={{
          pathname,
          query: { mode: "unlimited" },
        }}
        className={buttonVariants({ variant: "flat" })}
      >
        Try Unlimited Mode
      </Link>
    </div>
  );
}
