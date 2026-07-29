"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PostCard } from "@/components/ui/PostCard";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/types";

interface BlogListingProps {
  posts:      PostMeta[];
  categories: { name: string; count: number }[];
}

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [query,           setQuery]           = useState("");
  const [activeCategory, setActiveCategory]   = useState("All");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category.toLowerCase() === activeCategory.toLowerCase();

      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q)   ||
        post.excerpt.toLowerCase().includes(q)  ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Filter by category">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                activeCategory === cat
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(query || activeCategory !== "All") && (
        <p className="text-sm text-zinc-400 mb-6">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
          {query && <> for &ldquo;{query}&rdquo;</>}
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">No articles found</p>
          <p className="text-sm text-zinc-400">Try a different search term or category.</p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("All"); }}
            className="mt-4 text-sm text-brand-600 dark:text-brand-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
