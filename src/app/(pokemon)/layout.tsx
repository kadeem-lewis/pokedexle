import OptionsBar from "@/app/(pokemon)/_components/OptionsBar";
import React, { Suspense } from "react";
import Loading from "./loading";

type PokemonLayoutProps = {
  children: React.ReactNode;
};

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <>
      <OptionsBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
