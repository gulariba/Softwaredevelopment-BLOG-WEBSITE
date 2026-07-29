import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { PostMeta } from "@/types";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function PostCard({ post, variant = "default", className }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  // ─── Compact ────────────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group relative flex gap-4 items-start p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all",
          className
        )}
      >
        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image src={post.coverImage} alt="" fill sizes="64px" className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <CategoryBadge category={post.category} size="sm" className="mb-1" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">{post.readingTime}</p>
        </div>
        {/* Full-card link overlay */}
        <Link
          href={href}
          className="absolute inset-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label={`Read: ${post.title}`}
        />
      </div>
    );
  }

  // ─── Featured ───────────────────────────────────────────────────────────────
  if (variant === "featured") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-zinc-900 dark:bg-zinc-800 shadow-xl h-full min-h-[420px] flex flex-col justify-end",
          className
        )}
      >
        {/* Cover */}
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-zinc-300 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readingTime}
            </span>
          </div>
          <h2 className="font-serif font-bold text-white text-xl md:text-2xl lg:text-3xl leading-tight mb-3 group-hover:text-brand-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-zinc-600 flex-shrink-0">
              <Image src={post.author.avatar} alt="" fill sizes="28px" className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-medium text-white">{post.author.name}</span>
              <span className="text-zinc-400 text-xs mx-2">·</span>
              <span className="text-xs text-zinc-400">{formatDateShort(post.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Full-card link overlay */}
        <Link
          href={href}
          className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          aria-label={`Read: ${post.title}`}
        />
      </article>
    );
  }

  // ─── Default ────────────────────────────────────────────────────────────────
  return (
    <article
      className={cn(
        "group relative h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden card-hover",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-10">
          {/* Category badge — sits above the overlay, so keep its own z-index */}
          <CategoryBadge
            category={post.category}
            href={`/categories/${post.category.toLowerCase()}`}
            className="relative z-10"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDateShort(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
            <Image src={post.author.avatar} alt="" fill sizes="28px" className="object-cover" />
          </div>
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
            {post.author.name}
          </span>
          <span className="ml-auto text-xs text-brand-600 dark:text-brand-400 font-medium group-hover:underline flex-shrink-0">
            Read →
          </span>
        </div>
      </div>

      {/* Full-card link overlay — sits above everything except interactive children */}
      <Link
        href={href}
        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        aria-label={`Read: ${post.title}`}
      />
    </article>
  );
}
