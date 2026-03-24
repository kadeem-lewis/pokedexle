import OptionsBar from "@/app/(pokemon)/_components/OptionsBar";
import React, { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";

type PokemonLayoutProps = {
  children: React.ReactNode;
};

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <>
      <OptionsBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Script
        async
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
    </>
  );
}
