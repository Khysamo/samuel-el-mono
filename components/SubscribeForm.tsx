"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="border border-[var(--border)] rounded-lg p-8 mt-16">
      <h2 className="text-xl font-semibold mb-1">Recibe cada post en tu correo</h2>
      <p className="text-[var(--muted)] mb-5 text-sm leading-relaxed">
        Un post nuevo cada día. Sin spam, puedes darte de baja cuando quieras.
      </p>

      {status === "success" ? (
        <p className="text-sm text-[var(--foreground)]">
          ¡Listo! Revisa tu correo para confirmar la suscripción.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2 rounded-md bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Enviando..." : "Suscribirme"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Algo salió mal. Intenta de nuevo.
        </p>
      )}
    </div>
  );
}
