"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  const router = useRouter();
  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <JotaiProvider>
          <DevTools />
          {children}
        </JotaiProvider>
      </ThemeProvider>
    </RouterProvider>
  );
}
