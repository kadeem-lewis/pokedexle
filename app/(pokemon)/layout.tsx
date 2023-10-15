import OptionsBar from "@/components/layout/OptionsBar";
import { Suspense } from "react";
import Loading from "./loading";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OptionsBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
