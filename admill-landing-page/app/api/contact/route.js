import nodemailer from "nodemailer";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(data, status = 200) {
  return Response.json(data, { status });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      message,
      honeypot = "",
      timestamp,
      company = "",
      phone = "",
      projectType = "",
      projectLocation = "",
      projectStage = "",
    } = body ?? {};

    // Silently accept obvious bot submissions without sending mail.
    if (String(honeypot).trim()) {
      return json({ success: true });
    }

    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim().toLowerCase();
    const cleanMessage = String(message ?? "").trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > MAX_NAME ||
      cleanEmail.length > MAX_EMAIL ||
      cleanMessage.length < 10 ||
      cleanMessage.length > MAX_MESSAGE
    ) {
      return json({ success: false, error: "Please check the submitted information." }, 400);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      return json({ success: false, error: "Please provide a valid email address." }, 400);
    }

    // The browser supplies this only as a lightweight anti-bot signal.
    // Reject timestamps that are clearly malformed or future-dated.
    if (timestamp !== undefined && timestamp !== null && String(timestamp).trim()) {
      const submittedAt = Number(timestamp);
      if (!Number.isFinite(submittedAt)) {
        return json({ success: false, error: "Invalid submission." }, 400);
      }
    }

    const safeCompany = String(company ?? "").trim().slice(0, 150);
    const safePhone = String(phone ?? "").trim().slice(0, 50);
    const safeProjectType = String(projectType ?? "").trim().slice(0, 100);
    const safeProjectLocation = String(projectLocation ?? "").trim().slice(0, 150);
    const safeProjectStage = String(projectStage ?? "").trim().slice(0, 100);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.CONTACT_RECIPIENT || "info@admill.co.zw";
    const subject = `New Admill project enquiry${safeProjectType ? ` — ${safeProjectType}` : ""}`;
    const text = [
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      safeCompany && `Company: ${safeCompany}`,
      safePhone && `Phone: ${safePhone}`,
      safeProjectType && `Project type: ${safeProjectType}`,
      safeProjectLocation && `Project location: ${safeProjectLocation}`,
      safeProjectStage && `Project stage: ${safeProjectStage}`,
      "",
      "Message:",
      cleanMessage,
    ].filter(Boolean).join("\n");

    const html = `
      <h2>New Admill Project Enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      ${safeCompany ? `<p><strong>Company:</strong> ${escapeHtml(safeCompany)}</p>` : ""}
      ${safePhone ? `<p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>` : ""}
      ${safeProjectType ? `<p><strong>Project type:</strong> ${escapeHtml(safeProjectType)}</p>` : ""}
      ${safeProjectLocation ? `<p><strong>Project location:</strong> ${escapeHtml(safeProjectLocation)}</p>` : ""}
      ${safeProjectStage ? `<p><strong>Project stage:</strong> ${escapeHtml(safeProjectStage)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(cleanMessage).replaceAll("\n", "<br />")}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admill Website" <info@admill.co.zw>',
      to: recipient,
      replyTo: cleanEmail,
      subject,
      text,
      html,
    });

    return json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return json({ success: false, error: "Unable to send your enquiry right now." }, 500);
  }
}
