import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      auth: {
        user: 'princey01767@gmail.com',
        pass: 'add-app-password',
      },
    })
  );


  export { transporter };