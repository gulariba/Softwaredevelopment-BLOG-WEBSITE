"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings]   = useState<Heading[]>([]);
  const [activeId, setActiveId]   = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2, article h3")
    );
    setHeadings(
      els.map((el) => ({
        id:    el.id,
        text:  el.textContent ?? "",
        level: Number(el.tagName[1]),
      }))
    );
  }, []);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </h2>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block py-0.5 transition-all duration-150",
                level === 3 ? "pl-4" : "pl-0",
                activeId === id
                  ? "text-brand-600 dark:text-brand-400 font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
