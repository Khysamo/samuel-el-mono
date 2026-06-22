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
      <div className="flex items-center gap-5 mb-12">
        <span className="w-16 h-16 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-lg font-semibold tracking-wide shrink-0">
          SM
        </span>
        <div>
          <h1 className="text-3xl font-semibold">Samuel</h1>
          <p className="text-[var(--muted)] mt-1">21 años · Medellín · Diseño interactivo</p>
        </div>
      </div>

      <div className="prose prose-stone max-w-none dark:prose-invert prose-p:leading-8 prose-p:text-[var(--foreground)] prose-headings:font-semibold">
        <p>
          Soy estudiante de diseño interactivo, disponible para práctica profesional,
          y este blog es el lugar más honesto donde existo en internet.
        </p>
        <p>
          Lo empecé porque necesitaba un espacio permanente para plasmar mis pensamientos.
          Algo a lo que poder volver años después y ver quién era, qué decía, qué retos
          atravesaba y cómo los superé. Pero también para que otras personas puedan leer,
          aprender o simplemente sentirse acompañadas.
        </p>
        <p>
          Tengo una convicción que no me ha fallado: nada en la vida es imposible.
          Hay cosas que queremos, que aspiramos, que soñamos — y que se ven demasiado
          lejos. Pero estoy seguro de que cada uno de nosotros puede llegar ahí.
          El truco está en mirarte a ti mismo en el futuro y preguntarte: <em>si yo fuera
          esa persona, ¿qué haría hoy?</em>
        </p>
        <p>
          Cada día trato de acercarme más a esa visión. No porque sea fácil, sino porque
          estoy convencido de que por algo Dios puso todas estas cosas en mi mente y en
          mi corazón.
        </p>
        <p>
          Soy un soñador que cada día está más cerca de sus sueños.
        </p>

        <hr />

        <p className="text-[var(--muted)] text-sm">
          Si algo de lo que lees te resuena, <a href="/#subscribe">suscríbete</a>.
          Hay un post nuevo cada día.
        </p>
      </div>
    </div>
  );
}
