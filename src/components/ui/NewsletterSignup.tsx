"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  variant?: "default" | "minimal";
  className?: string;
}

export function NewsletterSignup({ variant = "default", className }: NewsletterSignupProps) {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setMessage("You're in! Check your inbox for a confirmation email.");
    setEmail("");
  }

  if (variant === "minimal") {
    return (
      <div className={cn("", className)}>
        {status === "success" ? (
          <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" /> {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-sm px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-brand-600 to-brand-800",
        "p-8 md:p-12",
        className
      )}
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/30 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"  aria-hidden="true" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2
          id="newsletter-heading"
          className="font-serif font-bold text-2xl md:text-3xl text-white mb-3"
        >
          Stay in the loop
        </h2>
        <p className="text-brand-100 text-sm md:text-base leading-relaxed mb-8">
          Get new articles delivered to your inbox every week. No spam, no fluff — just thoughtful writing on engineering and design.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span className="text-sm">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-brand-200 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {status === "loading" ? (
                "Subscribing…"
              ) : (
                <>Subscribe <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-red-300 text-sm">{message}</p>
        )}
      </div>
    </section>
  );
}
