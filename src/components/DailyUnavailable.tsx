import Link from "next/link";
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
        className="focus-visible:ring-ring inline-flex items-center justify-center  px-px py-0.5 uppercase transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        Try Unlimited Mode
      </Link>
    </div>
  );
}
