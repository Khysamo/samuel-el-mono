import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuel-el-mono.vercel.app";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Quién es Samuel el Mono y por qué escribe todos los días.",
  openGraph: {
    title: "Sobre mí · Samuel el Mono",
    description: "Quién es Samuel el Mono y por qué escribe todos los días.",
    url: `${siteUrl}/sobre-mi`,
    siteName: "Samuel el Mono",
    locale: "es_MX",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Sobre mí · Samuel el Mono",
    description: "Quién es Samuel el Mono y por qué escribe todos los días.",
  },
};

export default function SobreMi() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Sobre mí</h1>
      <div className="prose prose-stone max-w-none dark:prose-invert prose-p:leading-8 prose-p:text-[var(--foreground)]">
        <p>
          Soy Samuel. Escribo aquí todos los días porque creo que la constancia
          es más poderosa que el talento.
        </p>
        <p>
          Este espacio es mi bitácora personal: comparto lo que aprendo, los
          retos que enfrento y el progreso que logro, sin filtros ni pretensiones.
        </p>
        <p>
          Si algo de lo que lees te resuena, suscríbete. Hay un post nuevo cada día.
        </p>
      </div>
    </div>
  );
}
