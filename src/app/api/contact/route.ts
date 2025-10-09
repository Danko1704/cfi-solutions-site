import { NextResponse } from "next/server";
import { Resend } from "resend";

// Opcional pero útil: evita cualquier intento de pre-render que toque esta ruta.
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  org?: string;
  phone?: string;
  topic?: string;
  consent?: boolean;
  // token?: string; // si luego agregas reCAPTCHA
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<ContactPayload>;
    const { name, email, message, org, phone, topic, consent } = data || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // ⚠️ Modo “sin API key”: permite deploy y pruebas locales sin romper el build.
    if (!apiKey) {
      // Aquí solo registramos lo recibido y respondemos OK (sin enviar correo).
      console.log("[contact] RESEND_API_KEY not set. Payload:", {
        name,
        email,
        message,
        org,
        phone,
        topic,
        consent,
      });
      return NextResponse.json({
        ok: true,
        simulated: true,
        note:
          "RESEND_API_KEY not set. Email sending was skipped (simulated response).",
      });
    }

    // Instanciar Resend SOLO cuando sí hay clave
    const resend = new Resend(apiKey);

    // Envío real
    const result = await resend.emails.send({
      from: "CFI Solutions <no-reply@cfi-solutions.mx>", // requiere dominio verificado en Resend
      to: ["hello@cfi-solutions.mx"],
      subject: `New contact: ${topic || "General"}`,
      replyTo: email,
      text:
        `Name: ${name}\nEmail: ${email}\nCompany: ${org || "-"}\n` +
        `Phone: ${phone || "-"}\nTopic: ${topic || "-"}\nConsent: ${
          consent ? "Yes" : "No"
        }\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true, result });
  } catch (e) {
    console.error("[contact] error:", e);
    return NextResponse.json(
      { ok: false, error: e ?? "Server error" },
      { status: 500 }
    );
  }
}
