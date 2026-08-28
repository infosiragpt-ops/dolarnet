import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { getPost, POSTS } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <MarketingShell>
      <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <Link
          href="/blog"
          className="text-[13px] font-semibold text-ink/55 hover:text-ink"
        >
          ← Blog
        </Link>
        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
          {post.date} · {post.readingMinutes} min de lectura
        </p>
        <h1 className="mt-3 font-display text-[42px] leading-[1.05]">
          {post.title}
        </h1>
        <div className="mt-8 space-y-5 text-[17px] leading-8 text-ink/80">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
