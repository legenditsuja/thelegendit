import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const debugResponseEnabled = String(process.env.CONTACT_DEBUG_RESPONSE || '').toLowerCase() === 'true';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const parseEmailList = (value) =>
  String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueEmails = (items) =>
  Array.from(
    new Set(
      items
        .filter(Boolean)
        .map((item) => String(item).trim().toLowerCase())
        .filter(Boolean),
    ),
  );

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, service, message } = req.body || {};

  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  const emailHtml = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong></p>
    <p>${String(message).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const toRecipients = parseEmailList(process.env.CONTACT_RECEIVER);
    const ccRecipients = parseEmailList(process.env.CONTACT_CC);
    const bccRecipients = parseEmailList(process.env.CONTACT_BCC);

    const allRecipients = uniqueEmails([
      ...(toRecipients.length > 0 ? toRecipients : [process.env.SMTP_USER]),
      ...ccRecipients,
      ...bccRecipients,
    ]);

    const results = await Promise.allSettled(
      allRecipients.map((recipient) =>
        transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipient,
          replyTo: email,
          subject: `New Contact Form Submission - ${service}`,
          html: emailHtml,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || 'N/A'}\nService: ${service}\n\nMessage:\n${message}`,
        }),
      ),
    );

    const sentRecipients = [];
    const failedRecipients = [];

    results.forEach((result, index) => {
      const recipient = allRecipients[index];

      if (result.status === 'fulfilled') {
        sentRecipients.push(recipient);
      } else {
        failedRecipients.push(recipient);
      }
    });

    console.log('Contact email dispatch result:', { sentRecipients, failedRecipients });

    if (sentRecipients.length === 0) {
      return res.status(500).json({ message: 'Email sending failed. Please try again later.' });
    }

    const responsePayload = {
      message:
        failedRecipients.length > 0
          ? 'Message sent, but forwarding failed for some recipients.'
          : 'Email sent successfully.',
    };

    if (debugResponseEnabled) {
      responsePayload.sentRecipients = sentRecipients;
      responsePayload.failedRecipients = failedRecipients;
    }

    return res.status(200).json(responsePayload);
  } catch {
    return res.status(500).json({ message: 'Email sending failed. Please try again later.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Contact API running on port ${port}`);
});