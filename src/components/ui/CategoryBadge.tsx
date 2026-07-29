import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "bg-blue-100   text-blue-700   dark:bg-blue-950/50   dark:text-blue-400",
  design:      "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  technology:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  general:     "bg-zinc-100   text-zinc-600   dark:bg-zinc-800      dark:text-zinc-400",
};

interface CategoryBadgeProps {
  category: string;
  href?: string;
  size?: "sm" | "md";
  className?: string;
}

export function CategoryBadge({
  category,
  href,
  size = "md",
  className,
}: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category.toLowerCase()] ?? CATEGORY_COLORS.general;

  const classes = cn(
    "inline-flex items-center rounded-full font-medium transition-opacity hover:opacity-80",
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs",
    color,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {category}
      </Link>
    );
  }

  return <span className={classes}>{category}</span>;
}
