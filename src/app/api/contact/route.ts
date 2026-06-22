import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "Invalid message data." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (
    trimmedName.length > 100 ||
    trimmedEmail.length > 100 ||
    trimmedMessage.length > 1000
  ) {
    return NextResponse.json({ error: "Input is too long." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const emailHost = process.env.EMAIL_HOST;
  const emailPortStr = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || emailUser;

  const hasTelegramConfig = !!(botToken && chatId);
  const hasEmailConfig = !!(emailHost && emailUser && emailPass);

  if (!hasTelegramConfig && !hasEmailConfig) {
    return NextResponse.json(
      { error: "Contact form is not configured. Please check server environment variables." },
      { status: 500 }
    );
  }

  let telegramSuccess = false;
  let emailSuccess = false;
  let telegramErrorMsg = "";
  let emailErrorMsg = "";

  // 1. Send via Telegram Bot
  if (hasTelegramConfig) {
    const text = [
      "📬 New Portfolio Message!",
      `👤 Name: ${trimmedName}`,
      `✉️ Email: ${trimmedEmail}`,
      `📝 Message:`,
      trimmedMessage,
    ].join("\n");

    try {
      const telegramRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        }
      );

      if (telegramRes.ok) {
        telegramSuccess = true;
      } else {
        const data = await telegramRes.json().catch(() => null);
        telegramErrorMsg = data?.description || "Telegram API failed";
      }
    } catch (err) {
      telegramErrorMsg = err instanceof Error ? err.message : "Telegram network error";
    }
  }

  // 2. Send via Email (Nodemailer)
  if (hasEmailConfig) {
    const emailPort = emailPortStr ? parseInt(emailPortStr, 10) : 587;

    try {
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const currentYear = new Date().getFullYear();

      // Visitor HTML Confirmation Template
      const visitorHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Vanhong Horn</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #030712;
      color: #f3f4f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #030712;
      padding: 2rem 0;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0d1527 0%, #050914 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 2rem 2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    .logo {
      font-size: 1.4rem;
      font-weight: 800;
      color: #00f2fe;
      text-decoration: none;
      letter-spacing: 2px;
      font-family: monospace;
    }
    .content {
      padding: 2rem;
    }
    h1 {
      font-size: 1.35rem;
      font-weight: 700;
      margin-top: 0;
      color: #ffffff;
    }
    p {
      font-size: 0.95rem;
      line-height: 1.6;
      color: #9ca3af;
      margin-bottom: 1.5rem;
    }
    
    /* Code Editor Mockup */
    .code-editor {
      background: #090e1a;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      overflow: hidden;
      margin: 2rem 0;
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
      text-align: left;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    }
    .editor-header {
      background: #0b1120;
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .window-buttons {
      display: flex;
      gap: 6px;
      margin-right: 1.5rem;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot.red { background-color: #ef4444; }
    .dot.yellow { background-color: #f59e0b; }
    .dot.green { background-color: #10b981; }
    
    .editor-tab {
      font-size: 0.72rem;
      color: #00f2fe;
      background: #0d1527;
      padding: 0.3rem 0.8rem;
      border-radius: 6px 6px 0 0;
      margin-bottom: -0.65rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      border-left: 1px solid rgba(255,255,255,0.08);
      border-right: 1px solid rgba(255,255,255,0.08);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .editor-tab::before {
      content: "{}";
      color: #f92672;
      font-size: 0.7rem;
      font-weight: 800;
    }
    .editor-body {
      padding: 1.25rem;
      font-size: 0.82rem;
      line-height: 1.6;
      color: #f8f8f2;
      overflow-x: auto;
    }
    .code-content {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .keyword { color: #f8f8f2; }
    .key { color: #f92672; }
    .string { color: #e6db74; }
    .number { color: #ae81ff; }
    .boolean { color: #66d9ef; }

    .btn-cta {
      display: inline-block;
      padding: 0.8rem 1.75rem;
      background: linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%);
      color: #030712 !important;
      font-weight: 800;
      font-size: 0.9rem;
      border-radius: 10px;
      text-decoration: none;
      margin-top: 1rem;
      text-align: center;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
      transition: all 0.25s;
    }
    .footer {
      padding: 1.5rem 2rem 2.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
      background: rgba(0, 0, 0, 0.25);
    }
    .social-links {
      margin-bottom: 1rem;
    }
    .social-link {
      display: inline-block;
      margin: 0 0.75rem;
      color: #9ca3af;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .social-link:hover {
      color: #00f2fe;
    }
    .footer-text {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="https://vanhonghorn-portfolio.vercel.app" class="logo">&lt;VANHONG HORN /&gt;</a>
      </div>
      <div class="content">
        <h1>Hello ${trimmedName},</h1>
        <p>Thank you for reaching out! I have received your message from my portfolio website's contact form. I appreciate you taking the time to contact me.</p>
        
        <p>Here is a copy of the message you submitted:</p>
        
        <!-- Mock Code Editor -->
        <div class="code-editor">
          <div class="editor-header">
            <div class="window-buttons">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="editor-tab">contact.json</div>
          </div>
          <div class="editor-body">
            <pre class="code-content"><code><span class="keyword">{</span>
  <span class="key">"sender"</span>: <span class="string">"${trimmedName.replace(/"/g, '\\"')}"</span>,
  <span class="key">"email"</span>: <span class="string">"${trimmedEmail.replace(/"/g, '\\"')}"</span>,
  <span class="key">"status"</span>: <span class="string">"delivered"</span>,
  <span class="key">"message"</span>: <span class="string">"${trimmedMessage.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '')}"</span>
<span class="keyword">}</span></code></pre>
          </div>
        </div>
        
        <p>I have received your message and will review it. I will reply to you later when I'm free. In the meantime, feel free to check out my latest updates on LinkedIn or message me on Telegram.</p>
        
        <div style="text-align: center; margin-top: 1.5rem; margin-bottom: 0.5rem;">
          <a href="https://t.me/vanhongVH" class="btn-cta">Message on Telegram</a>
        </div>
      </div>
      <div class="footer">
        <div class="social-links">
          <a href="https://www.linkedin.com/in/horn-vanhong-45366324a/" class="social-link">LinkedIn</a>
          <a href="https://t.me/vanhongVH" class="social-link">Telegram</a>
          <a href="https://github.com/HornVanhong" class="social-link">GitHub</a>
        </div>
        <p class="footer-text">&copy; ${currentYear} Vanhong Horn. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `;

      // Admin HTML Notification Template
      const adminHtmlContent = `
<div style="font-family: sans-serif; padding: 20px; background: #030712; color: #f3f4f6; border-radius: 10px; max-width: 580px; margin: 0 auto; border: 1px solid rgba(255, 255, 255, 0.08);">
  <h2 style="color: #00f2fe; margin-top: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 10px;">New Contact Form Submission</h2>
  <p style="margin-bottom: 8px;"><strong>Name:</strong> ${trimmedName}</p>
  <p style="margin-bottom: 20px;"><strong>Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #00f2fe; text-decoration: none;">${trimmedEmail}</a></p>
  <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 6px; border-left: 3px solid #00f2fe; color: #e5e7eb;">
    <p style="margin: 0; white-space: pre-wrap; line-height: 1.5; font-size: 0.95rem;">${trimmedMessage}</p>
  </div>
</div>
      `;

      // Send to visitor
      await transporter.sendMail({
        from: `"Vanhong Horn" <${emailUser}>`,
        to: trimmedEmail,
        subject: "Thank you for contacting me - Vanhong Horn",
        html: visitorHtmlContent,
      });

      // Send to admin
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${emailUser}>`,
        to: emailTo,
        subject: `New Portfolio Message from ${trimmedName}`,
        html: adminHtmlContent,
        text: `New portfolio contact message from ${trimmedName} (${trimmedEmail}):\n\n${trimmedMessage}`,
      });

      emailSuccess = true;
    } catch (err) {
      emailErrorMsg = err instanceof Error ? err.message : "Email SMTP delivery error";
    }
  }

  // Final check: if both services were active but failed, return an error
  const telegramFailed = hasTelegramConfig && !telegramSuccess;
  const emailFailed = hasEmailConfig && !emailSuccess;

  if (telegramFailed && emailFailed) {
    return NextResponse.json(
      { error: `Both services failed. Telegram Error: ${telegramErrorMsg}. Email Error: ${emailErrorMsg}.` },
      { status: 502 }
    );
  }

  if (hasEmailConfig && emailFailed) {
    console.error(`Email delivery failed but Telegram succeeded. Email Error: ${emailErrorMsg}`);
  }

  if (hasTelegramConfig && telegramFailed) {
    console.error(`Telegram delivery failed but Email succeeded. Telegram Error: ${telegramErrorMsg}`);
  }

  return NextResponse.json({ ok: true });
}

