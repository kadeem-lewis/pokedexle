"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";
export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="my-auto">
      {resolvedTheme && (
        <button
          name="theme-toggle"
          aria-label="Toggle Dark Mode"
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          className="inline-flex transform items-center justify-center rounded-md border-2 border-foreground p-1 text-fg transition duration-200 ease-in-out hover:bg-bg-muted"
        >
          <Icon
            name="pokemon-moon"
            className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            name="pokemon-sun"
            className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </button>
      )}
    </div>
  );
}
