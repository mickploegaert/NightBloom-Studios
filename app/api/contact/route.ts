import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = form.get("name")?.toString().trim() ?? "";
  const email = form.get("email")?.toString().trim() ?? "";
  const company = form.get("company")?.toString().trim() ?? "";
  const message = form.get("message")?.toString().trim() ?? "";
  const budget = form.get("budget")?.toString().trim() ?? "";
  const projectTypes = form.getAll("projectTypes").map((t) => t.toString());
  const turnstileToken = form.get("turnstileToken")?.toString() ?? "";
  const file = form.get("file");

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (!turnstileToken) {
    return NextResponse.json({ ok: false, error: "Missing Turnstile token." }, { status: 400 });
  }

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ ok: false, error: "Attachment is too large (max 10MB)." }, { status: 400 });
    }
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration. Please try again later." },
      { status: 500 }
    );
  }

  // Verify the Turnstile token server-side — never trust the client alone.
  const verifyForm = new URLSearchParams();
  verifyForm.append("secret", secretKey);
  verifyForm.append("response", turnstileToken);
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for");
  if (ip) verifyForm.append("remoteip", ip);

  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyForm.toString(),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      console.warn("Turnstile verification failed:", verifyData["error-codes"]);
      return NextResponse.json(
        { ok: false, error: "Verification failed. Please try again." },
        { status: 403 }
      );
    }
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not verify your request. Please try again." },
      { status: 502 }
    );
  }

  // TODO: hook this up to an email provider (e.g. Resend) or CRM once available.
  // TODO: persist the attachment to storage (e.g. S3/R2) and attach it to the notification email.
  console.log("New contact form submission:", {
    name,
    email,
    company,
    message,
    budget,
    projectTypes,
    file: file instanceof File && file.size > 0 ? { name: file.name, size: file.size, type: file.type } : null,
  });

  return NextResponse.json({ ok: true });
}
