const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EODB Contact" <${process.env.MAIL_USER}>`,
      to: "pandeyash.yp20@gmail.com",
      replyTo: email,
      subject: subject || "New Contact Query",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    await transporter.sendMail({
      from: `"Ease of Doing Business" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Ease of Doing Business",
      html: `
        <p>Dear ${name},</p>

        <p>Thank you for reaching out to <strong>Ease of Doing Business (EODB)</strong>.</p>

        <p>We have received your query and our team will get back to you shortly.</p>

        <p>If your matter is urgent, feel free to reply to this email.</p>

        <br/>

        <p>Warm regards,<br/>
        <strong>Ease of Doing Business Team</strong></p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email sending failed" });
  }
});

module.exports = router;
