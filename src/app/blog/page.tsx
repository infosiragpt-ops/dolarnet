import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas de Dolarnett sobre cotizaciones, corredores y cómo preparar un envío.",
};

export default function BlogPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Blog
        </p>
        <h1 className="mt-3 font-display text-[48px] leading-none">
          Notas para enviar con la cabeza fría
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-7 text-muted">
          El blog de WordPress solo tenía el post de bienvenida. Aquí hay
          artículos propios sobre el producto, sin reseñas inventadas.
        </p>
        <div className="mt-10 grid gap-4">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[24px] border border-ink/10 bg-white p-6 transition hover:border-ink/25"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                {post.date} · {post.readingMinutes} min
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-tight">
                {post.title}
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
