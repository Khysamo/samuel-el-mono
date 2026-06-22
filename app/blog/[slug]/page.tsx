import Link from "next/link";
import { getPost, getAllPosts, formatDate } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

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
  try {
    const post = getPost(slug);
    return { title: `${post.title} · Samuel el Mono`, description: post.excerpt };
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
          <time className="text-sm text-[var(--muted)]">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)] prose-a:underline-offset-4 prose-p:leading-8 prose-p:text-[var(--foreground)] prose-li:text-[var(--foreground)]">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
