import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "jotai";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Provider>{children}</Provider>
    </ThemeProvider>
  );
}
