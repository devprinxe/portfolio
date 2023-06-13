import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

export { transporter };
