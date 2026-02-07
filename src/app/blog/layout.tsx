import type { Metadata } from "next";
import type { ReactNode } from "react";
import { baseUrl } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Grammar Blog | Word Finder",
  description: "Articles, guides, and tips to improve your grammar and writing.",
  openGraph: {
    title: "Grammar Blog | Word Finder",
    description: "Articles, guides, and tips to improve your grammar and writing.",
    url: `${baseUrl}/blog`,
    type: "website",
  },
  robots: "index, follow",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}

