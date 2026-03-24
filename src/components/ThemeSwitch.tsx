"use client";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";
import { Button } from "react-aria-components";
import { MenuContent, MenuItem, MenuTrigger } from "./ui/Menu";
export default function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <MenuTrigger>
      <Button
        name="theme-toggle"
        aria-label="Toggle Dark Mode"
        onClick={() => setTheme("light")}
        className="hover:bg-bg-muted inline-flex transform items-center justify-center rounded-md border-2 border-fg p-1 text-fg transition duration-200 ease-in-out"
      >
        <Icon
          name="pokemon-moon"
          className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Icon
          name="pokemon-sun"
          className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
      </Button>
      <MenuContent className="text-2xl">
        <MenuItem id="light" onClick={() => setTheme("light")}>
          Light
        </MenuItem>
        <MenuItem id="dark" onClick={() => setTheme("dark")}>
          Dark
        </MenuItem>
        <MenuItem id="system" onClick={() => setTheme("system")}>
          System
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
