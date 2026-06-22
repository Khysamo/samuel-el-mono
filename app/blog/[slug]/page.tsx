import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/posts";
import { formatDate, readingTime } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuel-el-mono.vercel.app";
  try {
    const post = getPost(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${siteUrl}/blog/${slug}`,
        siteName: "Samuel el Mono",
        locale: "es_MX",
        type: "article",
        publishedTime: post.date,
        authors: ["Samuel"],
      },
      twitter: {
        card: "summary",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: "Samuel el Mono" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 inline-block"
      >
        ← Volver
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{readingTime(post.content)}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)] prose-a:underline-offset-4 prose-p:leading-8 prose-p:text-[var(--foreground)] prose-li:text-[var(--foreground)]">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-12 pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            ← Todos los posts
          </Link>
          <ShareButton
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuel-el-mono.vercel.app"}/blog/${slug}`}
          />
        </footer>
      </article>
    </div>
  );
}
