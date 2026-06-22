import type { Metadata } from "next";
import { Lora } from "next/font/google";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuel-el-mono.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Samuel el Mono",
    template: "%s · Samuel el Mono",
  },
  description: "Pensamientos, retos y progreso. Todos los días.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Samuel el Mono",
    description: "Pensamientos, retos y progreso. Todos los días.",
    url: siteUrl,
    siteName: "Samuel el Mono",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Samuel el Mono",
    description: "Pensamientos, retos y progreso. Todos los días.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-lora)] bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <header className="border-b border-[var(--border)] py-6">
            <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <span className="w-9 h-9 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-semibold tracking-wide shrink-0">
                  SM
                </span>
                <span className="text-xl font-semibold tracking-tight">Samuel el Mono</span>
              </Link>
              <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Inicio
                </Link>
                <Link href="/sobre-mi" className="hover:text-[var(--foreground)] transition-colors">
                  Sobre mí
                </Link>
                <ThemeToggle />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
