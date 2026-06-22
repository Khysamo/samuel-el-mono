import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getPost, formatDate } from "@/lib/posts";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { slug, secret } = await request.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ error: "Falta el slug del post" }, { status: 400 });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }

  let post;
  try {
    post = getPost(slug);
  } catch {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const blogUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuel-el-mono.vercel.app";
  const postUrl = `${blogUrl}/blog/${slug}`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1c1917;">
      <p style="font-size: 13px; color: #78716c; margin-bottom: 24px;">
        ${formatDate(post.date)}
      </p>

      <h1 style="font-size: 26px; font-weight: 600; margin: 0 0 16px; line-height: 1.3;">
        ${post.title}
      </h1>

      ${post.excerpt ? `<p style="font-size: 16px; color: #44403c; line-height: 1.8; margin-bottom: 24px;">${post.excerpt}</p>` : ""}

      <a href="${postUrl}" style="display: inline-block; background: #1c1917; color: #faf8f5; padding: 10px 20px; border-radius: 6px; font-size: 14px; text-decoration: none; margin-bottom: 40px;">
        Leer el post completo →
      </a>

      <hr style="border: none; border-top: 1px solid #e7e5e4; margin-bottom: 24px;" />

      <p style="font-size: 12px; color: #a8a29e; line-height: 1.6;">
        Recibiste este correo porque te suscribiste a Samuel el Mono.<br/>
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #a8a29e;">Darse de baja</a>
      </p>
    </div>
  `;

  const { data, error } = await resend.broadcasts.create({
    audienceId,
    from: "Samuel el Mono <onboarding@resend.dev>",
    subject: post.title,
    html,
    name: `Post: ${post.title}`,
  });

  if (error || !data) {
    console.error("Error creando broadcast:", error);
    return NextResponse.json({ error: "Error al crear el broadcast", detail: error }, { status: 500 });
  }

  const { error: sendError } = await resend.broadcasts.send(data.id);

  if (sendError) {
    console.error("Error enviando broadcast:", sendError);
    return NextResponse.json({ error: "Error al enviar el broadcast", detail: sendError }, { status: 500 });
  }

  return NextResponse.json({ success: true, broadcastId: data.id });
}
