import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { PostMeta } from "@/types";

interface HeroSectionProps {
  featuredPost: PostMeta;
}

export function HeroSection({ featuredPost }: HeroSectionProps) {
  return (
    <section aria-label="Featured post" className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-brand-950/20 -z-10"
        aria-hidden="true"
      />

      <div className="container-blog py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Featured Article
              </span>
              <CategoryBadge category={featuredPost.category} size="sm" />
            </div>

            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-5xl text-zinc-900 dark:text-zinc-50 leading-tight mb-5">
              {featuredPost.title}
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-6 max-w-lg">
              {featuredPost.excerpt}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                  <Image
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {featuredPost.author.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {formatDateShort(featuredPost.publishedAt)}
                  </p>
                </div>
              </div>
              <span className="text-zinc-200 dark:text-zinc-700">|</span>
              <span className="flex items-center gap-1 text-sm text-zinc-400">
                <Clock className="w-4 h-4" /> {featuredPost.readingTime}
              </span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all duration-200 hover:gap-3 shadow-lg shadow-brand-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <Link href={`/blog/${featuredPost.slug}`} className="block group rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
