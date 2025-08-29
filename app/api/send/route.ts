import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, date } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lorenzobonacchi1997@gmail.com",
      subject: "Nuovo contatto dal form",
      html: `
        <h2>Nuovo contatto ricevuto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Data preferita:</strong> ${date}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
