import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export interface EarlyAccessLead {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  phone?: string;
  useCase?: string;
  volume?: string;
  notes?: string;
  timestamp: string;
}

// Generate high-density, technical notification email for the internal team
function generateAdminNotificationEmail(lead: EarlyAccessLead): { html: string; text: string; subject: string } {
  const applicantLabel = lead.name
    ? `${lead.name}${lead.company ? ` from ${lead.company}` : ""}`
    : lead.company || lead.email;
  const subject = `[New Early Access Application] ${applicantLabel}`;

  const text = `
NEW EARLY ACCESS APPLICATION
==================================================
A new prospect has submitted an early access application for Pulsar.

APPLICANT DETAILS:
- Full Name:       ${lead.name || "—"}
- Work Email:      ${lead.email}
- Company:         ${lead.company || "—"}
- Role / Title:    ${lead.role || "—"}
- Phone / WhatsApp:${lead.phone || "—"}
- Primary Ingress: ${lead.useCase || "—"}
- Monthly Volume:  ${lead.volume || "—"}

USE CASE & ARCHITECTURE NOTES:
${lead.notes || "None provided"}

METADATA:
- Timestamp:       ${lead.timestamp}
- Destination:     hello@anarva.online
==================================================
Reply directly to this email to contact the applicant.
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
      padding: 36px 16px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background: #0d121f;
      border: 1px solid #1e293b;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 28px 32px 22px;
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
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      margin: 0 0 6px;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.3px;
    }
    .subtitle {
      margin: 0;
      font-size: 13px;
      color: #94a3b8;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
    }
    .content {
      padding: 28px 32px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    table.data-table td {
      padding: 10px 12px;
      font-size: 13.5px;
      border-bottom: 1px solid #1e293b;
      vertical-align: top;
    }
    .row-label {
      color: #64748b;
      width: 145px;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .row-val {
      color: #f1f5f9;
      font-weight: 500;
    }
    .row-val strong {
      color: #38bdf8;
    }
    .tag {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
      font-size: 12px;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-weight: 600;
    }
    .notes-box {
      margin-top: 20px;
      padding: 16px;
      background: #090e18;
      border: 1px solid #1e293b;
      border-radius: 8px;
    }
    .notes-box-title {
      margin: 0 0 8px;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 11px;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.5px;
    }
    .notes-box-content {
      margin: 0;
      font-size: 13.5px;
      line-height: 22px;
      color: #cbd5e1;
      white-space: pre-wrap;
    }
    .actions {
      margin: 28px 0 8px;
      text-align: center;
    }
    .reply-btn {
      display: inline-block;
      padding: 11px 26px;
      background: #38bdf8;
      color: #030712 !important;
      text-decoration: none;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.25);
    }
    .footer {
      padding: 18px 32px;
      background: #080c14;
      border-top: 1px solid #1e293b;
      text-align: center;
      font-size: 11.5px;
      color: #64748b;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="badge">LEAD CAPTURE // PRIORITY QUEUE</span>
        <h1>New Early Access Request</h1>
        <p class="subtitle">Prospect: ${applicantLabel}</p>
      </div>
      <div class="content">
        <table class="data-table">
          <tr>
            <td class="row-label">Work Email</td>
            <td class="row-val">
              <a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${lead.email}</a>
            </td>
          </tr>
          <tr>
            <td class="row-label">Full Name</td>
            <td class="row-val">${lead.name || "—"}</td>
          </tr>
          <tr>
            <td class="row-label">Company</td>
            <td class="row-val"><strong>${lead.company || "—"}</strong></td>
          </tr>
          <tr>
            <td class="row-label">Role / Title</td>
            <td class="row-val">${lead.role || "—"}</td>
          </tr>
          <tr>
            <td class="row-label">Phone / WhatsApp</td>
            <td class="row-val">${lead.phone ? `<a href="tel:${lead.phone}" style="color: #94a3b8; text-decoration: none;">${lead.phone}</a>` : "—"}</td>
          </tr>
          <tr>
            <td class="row-label">Primary Channel</td>
            <td class="row-val"><span class="tag">${lead.useCase || "Not specified"}</span></td>
          </tr>
          <tr>
            <td class="row-label">Monthly Volume</td>
            <td class="row-val">${lead.volume || "Not specified"}</td>
          </tr>
        </table>

        ${lead.notes ? `
        <div class="notes-box">
          <div class="notes-box-title">Architecture & Automation Notes</div>
          <p class="notes-box-content">${lead.notes}</p>
        </div>` : ""}

        <div class="actions">
          <a href="mailto:${lead.email}?subject=Pulsar Early Access // Sandbox Cluster Invitation" class="reply-btn">
            Reply to Applicant →
          </a>
        </div>
      </div>
      <div class="footer">
        Dispatched from Pulsar Early Access Ingress · Received: ${lead.timestamp}
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  return { html, text, subject };
}

// Persist lead locally with all submitted fields
function saveLeadLocally(lead: EarlyAccessLead) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "subscribers.json");
    let subscribers: EarlyAccessLead[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        subscribers = JSON.parse(raw);
      } catch {
        subscribers = [];
      }
    }

    const existingIndex = subscribers.findIndex(
      (s) => s.email && s.email.toLowerCase() === lead.email.toLowerCase()
    );

    if (existingIndex >= 0) {
      subscribers[existingIndex] = {
        ...subscribers[existingIndex],
        ...lead,
      };
    } else {
      subscribers.push(lead);
    }

    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (err) {
    console.error("[Pulsar Lead Store] Failed to save lead locally:", err);
  }
}

type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

async function sendMail({ to, subject, text, html, replyTo }: MailPayload) {
  const from = process.env.EMAIL_FROM || "Pulsar Early Access <onboarding@pulsar.systems>";

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Resend responded with ${res.status}: ${errBody}`);
    }

    return "resend";
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
      from,
      to,
      replyTo,
      subject,
      text,
      html,
    });
    return "smtp";
  }

  return "simulated";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, company, role, phone, useCase, volume, notes } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const lead: EarlyAccessLead = {
      email: normalizedEmail,
      name: typeof name === "string" ? name.trim() : "",
      company: typeof company === "string" ? company.trim() : "",
      role: typeof role === "string" ? role.trim() : "",
      phone: typeof phone === "string" ? phone.trim() : "",
      useCase: typeof useCase === "string" ? useCase.trim() : "",
      volume: typeof volume === "string" ? volume.trim() : "",
      notes: typeof notes === "string" ? notes.trim() : "",
      timestamp: new Date().toISOString(),
    };

    // 1. Persist lead to local storage (all submitted form fields)
    saveLeadLocally(lead);

    // 2. Dispatch entire application form to the admin inbox (hello@anarva.online)
    // NOTE: We intentionally DO NOT send email to the user requesting early access,
    // as the team reviews submissions before contacting them.
    const leadInbox = process.env.ADMIN_NOTIFICATION_EMAIL || "hello@anarva.online";
    const { html, text, subject } = generateAdminNotificationEmail(lead);

    try {
      const channel = await sendMail({
        to: leadInbox,
        subject,
        text,
        html,
        replyTo: normalizedEmail,
      });

      if (channel === "simulated") {
        console.log(`[Pulsar Mailer / Dev Simulation] Captured early access application for: ${normalizedEmail}`);
        console.log(`[Pulsar Mailer / Dev Simulation] Full application would be dispatched to: ${leadInbox}`);
      } else {
        console.log(`[Pulsar Mailer] ${channel} dispatched early access application to ${leadInbox}`);
      }
    } catch (mailErr) {
      console.error("[Pulsar Mailer / Dispatch Error]:", mailErr);
      // Still return success if local storage succeeded, but log error
    }

    return NextResponse.json({
      success: true,
      message: "Application received. Our team will review your details and reach out.",
      lead: {
        email: normalizedEmail,
        name: lead.name,
        company: lead.company,
      },
    });
  } catch (error) {
    console.error("[Pulsar Mailer / Server Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
