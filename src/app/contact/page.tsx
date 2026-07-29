import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Twitter, Github, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the HRM Blog team. We'd love to hear from you.",
};

const CONTACT_OPTIONS = [
  {
    icon:        Mail,
    title:       "Email us",
    description: "For partnerships, collaborations, or any general enquiry.",
    action:      "hello@hrmblog.com",
    href:        "mailto:hello@hrmblog.com",
    color:       "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30",
  },
  {
    icon:        Twitter,
    title:       "Tweet at us",
    description: "We're active on Twitter — fastest way to get a response.",
    action:      "@hrmblog",
    href:        "https://twitter.com/hrmblog",
    color:       "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30",
  },
  {
    icon:        Github,
    title:       "Open an issue",
    description: "Found a bug or want to suggest an improvement to the site?",
    action:      "github.com/hrmblog",
    href:        "https://github.com",
    color:       "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-brand-950/20 py-16 md:py-20">
        <div className="container-blog max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/40 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Whether you have a story idea, a collaboration proposal, or just want to say hello — we read every message.
          </p>
        </div>
      </section>

      <div className="container-blog py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 max-w-4xl">
          {/* Form */}
          <div>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact options */}
          <aside>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-5">Other ways to reach us</h2>
            <div className="space-y-4">
              {CONTACT_OPTIONS.map(({ icon: Icon, title, description, action, href, color }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">{title}</p>
                    <p className="text-xs text-zinc-400 mb-1.5 leading-relaxed">{description}</p>
                    <p className="text-xs font-medium text-brand-600 dark:text-brand-400">{action}</p>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
