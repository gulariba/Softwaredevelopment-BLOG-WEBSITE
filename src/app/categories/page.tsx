import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Cpu } from "lucide-react";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all article categories on HRM Blog.",
};

const CATEGORY_META: Record<string, { icon: React.ElementType; description: string; color: string; bg: string }> = {
  engineering: { icon: Code2,   description: "Deep dives into React, TypeScript, system design, and architecture.", color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/30"   },
  design:      { icon: Palette, description: "Design systems, accessibility, UX research, and interface craft.",   color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30" },
  technology:  { icon: Cpu,     description: "AI, performance engineering, emerging tools, and industry trends.",  color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts      = getAllPostsMeta();

  return (
    <div className="container-blog py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-3">
          Categories
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Find articles organised by topic.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map(({ name, count }) => {
          const meta = CATEGORY_META[name.toLowerCase()];
          const Icon = meta?.icon;
          return (
            <Link
              key={name}
              href={`/categories/${name.toLowerCase()}`}
              className={`group relative rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-lg hover:-translate-y-0.5 ${meta?.bg ?? "bg-zinc-50 dark:bg-zinc-800/30"}`}
            >
              {Icon && (
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white dark:bg-zinc-900 shadow-sm ${meta.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                {meta?.description ?? `Articles in ${name}`}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">{count} {count === 1 ? "article" : "articles"}</span>
                <span className={`flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all ${meta?.color ?? ""}`}>
                  Browse <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
