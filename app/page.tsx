import PageCard from "@/components/PageCard";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Need to create pages array and map them to page card */}
      <Link href="/classic">
        <PageCard />
      </Link>
      <PageCard />
    </div>
  );
}
