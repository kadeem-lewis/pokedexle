"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type ProviderProps = {
  children: React.ReactNode;
};

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export default function Providers({ children }: ProviderProps) {
  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <JotaiProvider>
          <DevTools />
          {children}
        </JotaiProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}
