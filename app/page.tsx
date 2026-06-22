import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-14">
        <h1 className="text-3xl font-semibold mb-3">Hola, soy Samuel.</h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed">
          Aquí escribo mis pensamientos, retos y progreso. Todos los días.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-[var(--muted)]">Pronto habrá posts aquí.</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-sm text-[var(--muted)]">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 text-xl font-semibold group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-1 text-[var(--muted)] leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <SubscribeForm />
    </div>
  );
}
