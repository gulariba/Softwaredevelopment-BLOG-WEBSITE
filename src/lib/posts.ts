import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllPostsMeta(): PostMeta[] {
  const files = getPostFiles();
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    return {
      slug,
      title: data.title ?? "Untitled",
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage ?? "/images/placeholder.jpg",
      publishedAt: data.publishedAt ?? new Date().toISOString(),
      updatedAt: data.updatedAt,
      author: data.author ?? { name: "Anonymous", avatar: "/images/avatar.jpg", bio: "", role: "Writer" },
      category: data.category ?? "General",
      tags: data.tags ?? [],
      readingTime: rt.text,
      featured: data.featured ?? false,
    } satisfies PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.featured).slice(0, 3);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath  = path.join(POSTS_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!fullPath) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? "",
    content,
    coverImage: data.coverImage ?? "/images/placeholder.jpg",
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: data.author ?? { name: "Anonymous", avatar: "/images/avatar.jpg", bio: "", role: "Writer" },
    category: data.category ?? "General",
    tags: data.tags ?? [],
    readingTime: rt.text,
    featured: data.featured ?? false,
  };
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export function getAllTags(): string[] {
  const posts = getAllPostsMeta();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}
