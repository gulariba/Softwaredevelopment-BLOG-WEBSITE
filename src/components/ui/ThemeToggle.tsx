"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse", className)} />
    );
  }

  const cycles: Array<typeof theme> = ["light", "dark", "system"];
  const icons = {
    light:  <Sun  className="w-4 h-4" />,
    dark:   <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  };

  const next = cycles[(cycles.indexOf(theme) + 1) % cycles.length];

  return (
    <button
      onClick={() => setTheme(next as string)}
      aria-label={`Switch to ${next} theme`}
      className={cn(
        "relative w-9 h-9 rounded-full flex items-center justify-center",
        "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
        "text-zinc-600 dark:text-zinc-400",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="transition-transform duration-300">
        {icons[theme as keyof typeof icons] ?? icons.system}
      </span>
    </button>
  );
}
