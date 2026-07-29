export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  github?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  count: number;
  color: string;
}

export type ThemeMode = "light" | "dark" | "system";
