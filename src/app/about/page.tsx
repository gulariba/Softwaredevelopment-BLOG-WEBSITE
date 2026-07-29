import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Cpu, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about HRM Blog — our mission, our team, and what we write about.",
};

const TEAM = [
  {
    name:   "Sarah Chen",
    role:   "Senior Engineer",
    bio:    "Senior engineer at the intersection of AI and developer tooling. Previously at Google and Stripe.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    twitter: "sarahchen_dev",
  },
  {
    name:   "Marcus Rivera",
    role:   "Frontend Architect",
    bio:    "Frontend architect specialising in React and performance engineering. Open source contributor.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    twitter: "marcusrivera",
  },
  {
    name:   "Priya Patel",
    role:   "UX Designer",
    bio:    "UX designer focused on inclusive design systems. Speaker, writer, and advocate for accessible web experiences.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    twitter: "priyauxdesign",
  },
];

const VALUES = [
  { icon: Code2,   title: "Depth over breadth",  body: "We write long-form articles that go beyond the surface. Every post is researched, reviewed, and written to be genuinely useful." },
  { icon: Palette, title: "Craft matters",        body: "We care about how things are presented, not just what is said. Good writing and good design are both forms of respect for the reader." },
  { icon: Cpu,     title: "Practitioners first",  body: "Our authors are active engineers and designers. We write from real experience, not secondhand summaries." },
  { icon: Users,   title: "Community driven",     body: "We share everything we know, freely. The best teams make their knowledge available to everyone." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-brand-950/20 py-20 md:py-28">
        <div className="container-blog max-w-3xl">
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
            Engineering knowledge,<br />
            <span className="gradient-text">shared openly.</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-2xl">
            HRM Blog is a publication run by a small team of engineers and designers who believe the best way to level up the industry is to share what we learn — in depth, for free.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all hover:gap-3 shadow-lg shadow-brand-500/20"
          >
            Read the blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" aria-labelledby="values-heading">
        <div className="container-blog">
          <h2 id="values-heading" className="font-serif font-bold text-3xl text-zinc-900 dark:text-zinc-100 mb-10">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center mb-4 text-brand-600 dark:text-brand-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30" aria-labelledby="team-heading">
        <div className="container-blog">
          <h2 id="team-heading" className="font-serif font-bold text-3xl text-zinc-900 dark:text-zinc-100 mb-10">
            The team
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, bio, avatar, twitter }) => (
              <div key={name} className="text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-zinc-200 dark:bg-zinc-700">
                  <Image src={avatar} alt={name} fill sizes="80px" className="object-cover" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-2">{role}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{bio}</p>
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  @{twitter}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
