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
          className="transform rounded-md border-2 border-foreground p-1 transition duration-200 ease-in-out hover:bg-foreground hover:text-background"
        >
          {resolvedTheme === "light" ? (
            <Icon
              name="pixelarticons-moon-star"
              className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
          ) : (
            <Icon
              name="pixelarticons-sun"
              className="size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
          )}
        </button>
      )}
    </div>
  );
}
