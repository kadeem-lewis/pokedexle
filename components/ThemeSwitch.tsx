import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSun, BsMoon } from "react-icons/bs";
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
          className="border-2 p-2 border-current rounded-md"
        >
          {resolvedTheme === "light" ? <BsMoon /> : <BsSun />}
        </button>
      )}
    </div>
  );
}
