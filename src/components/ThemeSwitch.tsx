"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icons } from "./Icons";
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
          className="rounded-md border-2 border-foreground p-1 hover:bg-foreground hover:text-background transition duration-200 ease-in-out transform"
        >
          {resolvedTheme === "light" ? (
            <Icons.moon className="h-6 w-6" />
          ) : (
            <Icons.sun className="h-6 w-6" />
          )}
        </button>
      )}
    </div>
  );
}
