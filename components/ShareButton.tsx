"use client";

import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
      return;
    }
    setOpen((v) => !v);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 1a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM11.5 3a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM3.5 7a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm8 4a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" fill="currentColor"/>
          <path d="M5.886 8.42a.5.5 0 0 0 .228.672l3 1.5a.5.5 0 0 0 .443-.895l-3-1.5a.5.5 0 0 0-.671.223Zm.228-2.512a.5.5 0 1 0 .671-.224l-3-1.5a.5.5 0 1 0-.447.894l2.776 1.83Z" fill="currentColor"/>
        </svg>
        Compartir
      </button>

      {open && (
        <div className="absolute bottom-8 left-0 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-2 flex flex-col gap-1 min-w-[160px] z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
          >
            X / Twitter
          </a>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-colors text-left"
          >
            {copied ? "¡Copiado!" : "Copiar enlace"}
          </button>
        </div>
      )}
    </div>
  );
}
