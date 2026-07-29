"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state,   setState]   = useState<FormState>("idle");
  const [form,    setForm]    = useState({ name: "", email: "", subject: "", message: "" });
  const [errors,  setErrors]  = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())                        e.name    = "Name is required.";
    if (!form.email.trim())                       e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject.trim())                     e.subject = "Subject is required.";
    if (!form.message.trim())                     e.message = "Message is required.";
    else if (form.message.trim().length < 20)     e.message = "Message must be at least 20 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setState("loading");
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputCls = (field: keyof typeof form) =>
    cn(
      "w-full px-4 py-3 rounded-xl text-sm border transition-colors",
      "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
      "focus:outline-none focus:ring-2 focus:ring-brand-500",
      errors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
    );

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-8 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Message sent!</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Thanks for reaching out — we&apos;ll get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Full name <span aria-hidden className="text-red-400">*</span>
          </label>
          <input
            id="name" name="name" type="text"
            value={form.name} onChange={handleChange}
            placeholder="Jane Smith"
            autoComplete="name"
            aria-required aria-describedby={errors.name ? "name-error" : undefined}
            className={inputCls("name")}
          />
          {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Email <span aria-hidden className="text-red-400">*</span>
          </label>
          <input
            id="email" name="email" type="email"
            value={form.email} onChange={handleChange}
            placeholder="jane@example.com"
            autoComplete="email"
            aria-required aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls("email")}
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Subject <span aria-hidden className="text-red-400">*</span>
        </label>
        <input
          id="subject" name="subject" type="text"
          value={form.subject} onChange={handleChange}
          placeholder="Article submission / Feedback / Partnership"
          aria-required aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputCls("subject")}
        />
        {errors.subject && <p id="subject-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Message <span aria-hidden className="text-red-400">*</span>
        </label>
        <textarea
          id="message" name="message"
          value={form.message} onChange={handleChange}
          placeholder="Tell us what's on your mind…"
          rows={5}
          aria-required aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputCls("message"), "resize-none")}
        />
        {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
      </div>

      {state === "error" && (
        <p role="alert" className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-lg shadow-brand-500/20"
      >
        {state === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>Send message <Send className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}
