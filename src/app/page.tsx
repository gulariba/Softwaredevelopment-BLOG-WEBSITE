import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPostsMeta, getFeaturedPosts } from "@/lib/posts";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PostCard } from "@/components/ui/PostCard";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "DevBlog — Software Development, Engineering & Technology",
  description:
    "In-depth articles on software engineering, design systems, AI, and modern web development. Written by practitioners for practitioners.",
};

export default function HomePage() {
  const allPosts    = getAllPostsMeta();
  const featured    = getFeaturedPosts();
  const heroPost    = featured[0] ?? allPosts[0];
  const recentPosts = allPosts.filter((p) => p.slug !== heroPost?.slug).slice(0, 6);

  if (!heroPost) {
    return (
      <div className="container-blog py-32 text-center">
        <p className="text-zinc-400">No posts published yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <HeroSection featuredPost={heroPost} />

      {/* Categories */}
      <CategoriesSection />

      {/* Recent Posts */}
      <section aria-labelledby="recent-heading" className="py-16 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="container-blog">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                id="recent-heading"
                className="font-serif font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100"
              >
                Latest Articles
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                Fresh writing from our editorial team.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* More featured */}
      {featured.length > 1 && (
        <section aria-labelledby="featured-heading" className="py-16">
          <div className="container-blog">
            <h2
              id="featured-heading"
              className="font-serif font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-8"
            >
              Editor&apos;s Picks
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(1).map((post) => (
                <PostCard key={post.slug} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16">
        <div className="container-blog">
          <NewsletterSignup />
        </div>
      </section>

      <BackToTop />
    </>
  );
}
