import Link from "next/link";
import { Code2, Palette, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    name:        "Engineering",
    slug:        "engineering",
    description: "Deep dives into React, TypeScript, system design, and software architecture.",
    icon:        Code2,
    color:       "from-blue-500 to-blue-700",
    bg:          "bg-blue-50 dark:bg-blue-950/30",
    iconColor:   "text-blue-600 dark:text-blue-400",
  },
  {
    name:        "Design",
    slug:        "design",
    description: "Design systems, accessibility, UX research, and the craft of great interfaces.",
    icon:        Palette,
    color:       "from-purple-500 to-purple-700",
    bg:          "bg-purple-50 dark:bg-purple-950/30",
    iconColor:   "text-purple-600 dark:text-purple-400",
  },
  {
    name:        "Technology",
    slug:        "technology",
    description: "AI, performance, emerging tools, and the trends shaping the industry.",
    icon:        Cpu,
    color:       "from-emerald-500 to-emerald-700",
    bg:          "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor:   "text-emerald-600 dark:text-emerald-400",
  },
];

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories-heading" className="py-16">
      <div className="container-blog">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              id="categories-heading"
              className="font-serif font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100"
            >
              Browse by Topic
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
              Find articles on the subjects that matter most to you.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {CATEGORIES.map(({ name, slug, description, icon: Icon, bg, iconColor }) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className={cn(
                "group relative rounded-2xl p-6 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-0.5",
                bg
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white dark:bg-zinc-900 shadow-sm", iconColor)}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
              <div className={cn("flex items-center gap-1 mt-4 text-xs font-medium transition-all group-hover:gap-2", iconColor)}>
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
