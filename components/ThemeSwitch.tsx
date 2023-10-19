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
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          className="rounded-md border-2 border-current p-1"
        >
          {resolvedTheme === "light" ? (
            <Icons.moon className="h-6 w-6 text-current" />
          ) : (
            <Icons.sun className="h-6 w-6 text-current" />
          )}
        </button>
      )}
    </div>
  );
}
