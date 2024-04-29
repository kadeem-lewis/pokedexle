"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";
import { Button, Key } from "react-aria-components";
import { MenuContent, MenuItem, MenuTrigger } from "./ui/Menu";
export default function ThemeSwitch() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (theme: Key) => {
    setTheme(theme as string);
  };

  return (
    <MenuTrigger>
      <Button
        name="theme-toggle"
        aria-label="Toggle Dark Mode"
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
      </Button>
      <MenuContent onAction={handleThemeChange}>
        <MenuItem id="light">Light</MenuItem>
        <MenuItem id="dark">Dark</MenuItem>
        <MenuItem id="system">System</MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
