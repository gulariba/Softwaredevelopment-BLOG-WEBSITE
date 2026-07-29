import type { Metadata } from "next";
import { getAllPostsMeta, getAllCategories } from "@/lib/posts";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all articles on software development, engineering, and technology from the DevBlog team.",
};

export default function BlogPage() {
  const posts      = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <div className="container-blog py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 max-w-xl">
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-3">
          All Articles
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          {posts.length} articles on engineering, design, and technology.
        </p>
      </div>

      <BlogListing posts={posts} categories={categories} />
    </div>
  );
}
