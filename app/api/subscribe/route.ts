import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }

  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 });
  }

  await resend.emails.send({
    from: "Samuel el Mono <onboarding@resend.dev>",
    to: email,
    subject: "Ya estás suscrito a Samuel el Mono",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1c1917;">
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">Bienvenido a Samuel el Mono</h1>
        <p style="font-size: 16px; line-height: 1.8; color: #44403c;">
          A partir de hoy vas a recibir mis posts directamente en tu correo. Escribo todos los días — pensamientos, retos y progreso sin filtros.
        </p>
        <p style="font-size: 16px; line-height: 1.8; color: #44403c;">
          Gracias por sumarte al viaje.
        </p>
        <p style="font-size: 16px; line-height: 1.8; color: #44403c;">— Samuel</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
