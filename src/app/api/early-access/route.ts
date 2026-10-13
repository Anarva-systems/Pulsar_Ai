import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Generate responsive HTML email template matching Pulsar aesthetic
function generatePulsarWelcomeEmail(recipientEmail: string): { html: string; text: string } {
  const subject = "Welcome to Pulsar Early Access // Verification & Runtime Access";

  const text = `
Welcome to Pulsar Early Access

Thank you for requesting early access to the Pulsar Autonomous Resolution Engine.
Your email (${recipientEmail}) has been registered in our priority onboarding queue.

Pulsar turns customer conversations into verified, controlled action across voice, chat, and email:
- Omnichannel Support Engine: Ingests real-time calls (<180ms), emails (SQS FIFO), and chats into a unified runtime.
- Deterministic Guardrails: Intelligence proposes, deterministic business rules decide, and authorized systems execute.
- Connected Integrations: Live ERP checks, pgvector policy retrieval, and idempotent payment dispatch.

Our engineering team will reach out with your API access tokens and sandbox cluster credentials.

Explore technical architecture: https://pulsar.systems

© 2026 Pulsar, Inc. All rights reserved.
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050811;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #050811;
      padding: 40px 16px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #0d121f;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .header {
      padding: 32px 32px 24px;
      background: linear-gradient(180deg, #131b2e 0%, #0d121f 100%);
      border-bottom: 1px solid #1e293b;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 32px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.4px;
      line-height: 1.3;
    }
    p {
      margin: 0 0 18px;
      font-size: 14px;
      line-height: 24px;
      color: #94a3b8;
    }
    .highlight-box {
      margin: 24px 0;
      padding: 20px;
      border-radius: 12px;
      background: #111827;
      border: 1px solid #1f2937;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 12px;
    }
    .meta-row:last-child {
      margin-bottom: 0;
    }
    .meta-label {
      color: #64748b;
    }
    .meta-value {
      color: #38bdf8;
      font-weight: 600;
    }
    .features {
      margin: 24px 0;
      padding: 0;
      list-style: none;
    }
    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 12px;
      font-size: 13.5px;
      line-height: 20px;
      color: #cbd5e1;
    }
    .feature-bullet {
      color: #10b981;
      font-weight: bold;
    }
    .cta-btn-wrap {
      margin: 32px 0 16px;
      text-align: center;
    }
    .cta-btn {
      display: inline-block;
      padding: 12px 28px;
      background: #ffffff;
      color: #0a0a0a !important;
      text-decoration: none;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.2);
    }
    .footer {
      padding: 24px 32px;
      background: #080c14;
      border-top: 1px solid #1e293b;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    .footer a {
      color: #94a3b8;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="badge">AUTONOMOUS RUNTIME // PRIORITY ACCESS</span>
        <div class="logo-row">
          <div class="logo-text">Pulsar</div>
        </div>
      </div>
      <div class="content">
        <h1>You&apos;re on the priority list.</h1>
        <p>
          Thank you for requesting early access to <strong>Pulsar</strong>. We turn customer conversations into verified, controlled actions across voice, chat, and email.
        </p>

        <div class="highlight-box">
          <table width="100%" cellpadding="4" cellspacing="0" border="0">
            <tr>
              <td style="color:#64748b; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px;">Registered Email:</td>
              <td style="color:#ffffff; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px; text-align:right;"><strong>${recipientEmail}</strong></td>
            </tr>
            <tr>
              <td style="color:#64748b; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px;">Ingress Gate:</td>
              <td style="color:#38bdf8; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px; text-align:right;">Omnichannel (Voice · Email · Chat)</td>
            </tr>
            <tr>
              <td style="color:#64748b; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px;">Safety Perimeter:</td>
              <td style="color:#10b981; font-family:'SF Mono', Monaco, Consolas, monospace; font-size:12px; text-align:right;">Air-Gapped Deterministic FSM</td>
            </tr>
          </table>
        </div>

        <p>What you get during preview:</p>
        <table cellpadding="4" cellspacing="0" border="0" style="margin-bottom: 20px;">
          <tr>
            <td valign="top" style="color:#10b981; font-size:14px; padding-right:8px;">✔</td>
            <td style="color:#cbd5e1; font-size:13.5px; line-height:20px;">
              <strong>Real-time Voice Ingress:</strong> Native barge-in handling with sub-180ms conversational roundtrip.
            </td>
          </tr>
          <tr>
            <td valign="top" style="color:#10b981; font-size:14px; padding-right:8px;">✔</td>
            <td style="color:#cbd5e1; font-size:13.5px; line-height:20px;">
              <strong>Dual-Key Risk Gate:</strong> Strict deterministic limits (<$50 auto-action, >$50 HITL supervisor queue).
            </td>
          </tr>
          <tr>
            <td valign="top" style="color:#10b981; font-size:14px; padding-right:8px;">✔</td>
            <td style="color:#cbd5e1; font-size:13.5px; line-height:20px;">
              <strong>Live Ground-Truth Verification:</strong> Verifies actual ERP/OMS state before mutating live databases.
            </td>
          </tr>
        </table>

        <p>
          Our team is onboarding engineering teams in batches. When your cluster allocation is ready, you will receive your API authentication tokens and deploy instructions.
        </p>

        <div class="cta-btn-wrap">
          <a href="https://pulsar.systems" class="cta-btn">Inspect Technical Architecture →</a>
        </div>
      </div>
      <div class="footer">
        © 2026 Pulsar Inc. · Deterministic AI Infrastructure for Customer Operations<br>
        If you did not request this invite, please disregard this email.
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  return { html, text };
}

// Persist lead locally so no subscriber is ever lost
function saveLeadLocally(email: string) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "subscribers.json");
    let subscribers: { email: string; timestamp: string }[] = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      subscribers = JSON.parse(raw);
    }
    // Prevent duplicates
    if (!subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      subscribers.push({ email, timestamp: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Pulsar Lead Store] Failed to save lead locally:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Persist lead to local storage
    saveLeadLocally(normalizedEmail);

    const { html, text } = generatePulsarWelcomeEmail(normalizedEmail);
    const fromAddress = process.env.EMAIL_FROM || "Pulsar Early Access <onboarding@pulsar.systems>";
    const subject = "Welcome to Pulsar Early Access // Verification & Runtime Access";

    // 2. Dispatch via Resend API if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [normalizedEmail],
            subject,
            html,
            text,
          }),
        });

        if (!resendRes.ok) {
          const resendError = await resendRes.json();
          console.error("[Pulsar Mailer / Resend Error]:", resendError);
        } else {
          console.log(`[Pulsar Mailer] Resend successfully dispatched welcome email to ${normalizedEmail}`);
        }
      } catch (resendErr) {
        console.error("[Pulsar Mailer / Resend Exception]:", resendErr);
      }
    }
    // 3. Or dispatch via SMTP / Nodemailer if configured
    else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: fromAddress,
          to: normalizedEmail,
          subject,
          text,
          html,
        });

        console.log(`[Pulsar Mailer] SMTP successfully dispatched welcome email to ${normalizedEmail}`);
      } catch (smtpErr) {
        console.error("[Pulsar Mailer / SMTP Exception]:", smtpErr);
      }
    } else {
      // 4. Development simulation mode (no API keys configured yet)
      console.log(`[Pulsar Mailer / Dev Simulation] Captured early access request for: ${normalizedEmail}`);
      console.log(`[Pulsar Mailer / Dev Simulation] Tip: Configure RESEND_API_KEY or SMTP credentials in .env.local to send live emails.`);
    }

    // 5. Optional Admin Notification
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail && (process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER))) {
      try {
        if (process.env.RESEND_API_KEY) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromAddress,
              to: [adminEmail],
              subject: `[New Pulsar Lead] ${normalizedEmail} requested Early Access`,
              text: `A new user requested early access to Pulsar:\n\nEmail: ${normalizedEmail}\nTime: ${new Date().toISOString()}`,
            }),
          });
        }
      } catch (adminErr) {
        console.error("[Pulsar Mailer / Admin Notification Error]:", adminErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Priority invite dispatched. Please check your inbox.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("[Pulsar Mailer / Server Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
