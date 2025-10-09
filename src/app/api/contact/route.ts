import { NextResponse } from "next/server";
import { Resend } from "resend"; // npm i resend

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message, org, phone, topic, consent } = data || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optional: verify invisible reCAPTCHA token here (data.token)

    // Send email
    await resend.emails.send({
      from: "CFI Solutions <no-reply@cfi-solutions.mx>",
      to: ["hello@cfi-solutions.mx"],
      subject: `New contact: ${topic || "General"}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${org || "-"}\nPhone: ${
        phone || "-"
      }\nTopic: ${topic || "-"}\nConsent: ${
        consent ? "Yes" : "No"
      }\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
