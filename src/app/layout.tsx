import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hrm-blog.vercel.app"),
  title: {
    default: "HRM Blog — Engineering, Design & Technology",
    template: "%s | HRM Blog",
  },
  description:
    "In-depth articles on software engineering, design systems, AI, and modern web development. Written by practitioners for practitioners.",
  keywords: ["engineering", "design", "AI", "web development", "React", "TypeScript"],
  authors: [{ name: "HRM Blog Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrm-blog.vercel.app",
    siteName: "HRM Blog",
    title: "HRM Blog — Engineering, Design & Technology",
    description:
      "In-depth articles on software engineering, design systems, AI, and modern web development.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "HRM Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hrmblog",
    creator: "@hrmblog",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className=""
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
