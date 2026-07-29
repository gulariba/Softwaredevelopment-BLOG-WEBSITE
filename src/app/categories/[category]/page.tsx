import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/ui/PostCard";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map(({ name }) => ({ category: name.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `${name} Articles`,
    description: `Browse all ${name} articles on HRM Blog.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const posts = getPostsByCategory(params.category);
  const name  = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  if (!posts.length) notFound();

  return (
    <div className="container-blog py-12 md:py-16">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        All categories
      </Link>

      <div className="mb-10">
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-3">
          {name}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
