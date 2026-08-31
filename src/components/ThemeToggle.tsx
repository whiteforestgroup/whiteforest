"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      suppressHydrationWarning
      className="border-card-border bg-card-bg text-fg-muted flex items-center gap-2 rounded-full border px-1 py-1 text-xs font-medium shadow-sm"
    >
      <span
        suppressHydrationWarning
        className={`rounded-full px-2 py-1 ${!isDark ? "bg-accent text-white" : ""}`}
      >
        Light
      </span>
      <span
        suppressHydrationWarning
        className={`rounded-full px-2 py-1 ${isDark ? "bg-accent text-white" : ""}`}
      >
        Dark
      </span>
    </button>
  );
}
