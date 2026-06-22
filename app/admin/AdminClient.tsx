"use client";

import { useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function AdminClient({ posts }: { posts: Post[] }) {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { status: "success" | "error"; message?: string }>>({});

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (secret.trim()) setAuthed(true);
  }

  async function handleSend(slug: string) {
    setSending(slug);
    const res = await fetch("/api/send-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, secret }),
    });
    const body = await res.json();
    setResults((prev) => ({
      ...prev,
      [slug]: res.ok
        ? { status: "success" }
        : { status: "error", message: body.error + (body.detail ? `: ${JSON.stringify(body.detail)}` : "") },
    }));
    setSending(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-full max-w-sm px-6">
          <h1 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Admin</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Clave secreta"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="px-4 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Newsletter</h1>
      <p className="text-[var(--muted)] text-sm mb-10">
        Selecciona un post para enviárselo a todos tus suscriptores.
      </p>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex items-center justify-between gap-4 border border-[var(--border)] rounded-lg px-5 py-4"
          >
            <div className="min-w-0">
              <p className="text-xs text-[var(--muted)] mb-0.5">{post.date}</p>
              <p className="font-medium text-[var(--foreground)] truncate">{post.title}</p>
            </div>

            {results[post.slug]?.status === "success" ? (
              <span className="text-sm text-green-500 shrink-0">✓ Enviado</span>
            ) : results[post.slug]?.status === "error" ? (
              <span className="text-sm text-red-500 shrink-0 max-w-xs text-right">
                {results[post.slug].message ?? "Error desconocido"}
              </span>
            ) : (
              <button
                onClick={() => handleSend(post.slug)}
                disabled={sending === post.slug}
                className="shrink-0 px-4 py-1.5 rounded-md bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {sending === post.slug ? "Enviando..." : "Enviar"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
