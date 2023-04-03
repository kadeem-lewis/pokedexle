"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>{children}</JotaiProvider>
    </ThemeProvider>
  );
}
