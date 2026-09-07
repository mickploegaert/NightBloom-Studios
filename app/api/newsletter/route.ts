import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  // TODO: hook this up to a real mailing list provider (e.g. Resend, Mailchimp, Buttondown).
  console.log("New newsletter subscriber:", email);

  return NextResponse.json({ ok: true });
}
