import type { Metadata } from "next";
import { Lora } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Samuel el Mono",
  description: "Pensamientos, retos y progreso diario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-lora)] bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] py-6">
          <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
            >
              Samuel el Mono
            </Link>
            <nav className="flex gap-6 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                Inicio
              </Link>
              <Link href="/sobre-mi" className="hover:text-[var(--foreground)] transition-colors">
                Sobre mí
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-[var(--border)] py-8 mt-16">
          <div className="max-w-2xl mx-auto px-6 text-center text-sm text-[var(--muted)]">
            <p>Samuel el Mono · Escrito con ganas, publicado con constancia.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
