import Link from "next/link";
import { PenLine, Github, Twitter, Rss } from "lucide-react";

const FOOTER_LINKS = {
  Explore: [
    { label: "All Articles", href: "/blog" },
    { label: "Engineering",  href: "/categories/engineering" },
    { label: "Design",       href: "/categories/design" },
    { label: "Technology",   href: "/categories/technology" },
  ],
  Company: [
    { label: "About",   href: "/about"   },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIAL_LINKS = [
  { label: "GitHub",  href: "https://github.com",  icon: Github  },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "RSS",     href: "/feed.xml",           icon: Rss     },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 mt-16">
      <div className="container-blog py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <PenLine className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                Dev<span className="text-brand-600">Blog</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              In-depth articles on software development, engineering, and technology — written by practitioners for practitioners.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-brand-100 hover:text-brand-600 dark:hover:bg-brand-950 dark:hover:text-brand-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {year} DevBlog. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
