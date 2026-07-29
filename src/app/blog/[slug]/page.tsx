import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs, getAllPostsMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { PostCard } from "@/components/ui/PostCard";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title:       post.title,
    description: post.excerpt,
    authors:     [{ name: post.author.name }],
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        "article",
      publishedTime: post.publishedAt,
      authors:     [post.author.name],
      images:      [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.excerpt,
      images:      [post.coverImage],
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ] as never[],
  },
};

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts    = getAllPostsMeta();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <div className="relative w-full aspect-[21/9] max-h-[520px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container-blog py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All articles
          </Link>

          <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
            {/* Main content */}
            <div>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <CategoryBadge
                  category={post.category}
                  href={`/categories/${post.category.toLowerCase()}`}
                />
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full"
                  >
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-zinc-400">{post.author.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                  </span>
                </div>
              </div>

              {/* MDX Content */}
              <article
                className="prose prose-zinc dark:prose-invert prose-lg max-w-none
                  prose-headings:font-serif prose-headings:font-bold
                  prose-a:text-brand-600 dark:prose-a:text-brand-400
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-code:text-brand-600 dark:prose-code:text-brand-400
                  prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-800"
              >
                <MDXRemote source={post.content} options={mdxOptions} />
              </article>

              {/* Author card */}
              <div className="mt-12 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Written by</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</p>
                    <p className="text-sm text-zinc-400 mb-2">{post.author.role}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-zinc-50 dark:bg-zinc-900/30 py-16">
          <div className="container-blog">
            <h2
              id="related-heading"
              className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-8"
            >
              More in {post.category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16">
        <div className="container-blog max-w-3xl">
          <NewsletterSignup />
        </div>
      </section>

      <BackToTop />
    </>
  );
}
