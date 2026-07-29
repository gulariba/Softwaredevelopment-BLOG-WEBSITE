import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-6 text-zinc-400">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="font-serif font-bold text-6xl text-zinc-900 dark:text-zinc-100 mb-3">404</h1>
        <h2 className="font-semibold text-xl text-zinc-700 dark:text-zinc-300 mb-3">Page not found</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist, or it may have been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Browse articles
          </Link>
        </div>
      </div>
    </div>
  );
}
