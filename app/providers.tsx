"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        <DevTools />
        {children}
      </JotaiProvider>
    </ThemeProvider>
  );
}
