import { conn } from "../configuration/database.js";
import { transporter } from "../configuration/email_config.js";
import jwt from "jsonwebtoken";

//Save File Url to Database

const saveFile = (req, res) => {
  if (req.fileValidationError) {
    // Print the error message
    console.error(req.fileValidationError);
    // Return an error response to the client
    return res.status(400).json({ error: req.fileValidationError });
  }
  if (!req.file) {
    return res.status(404).json({ error: "File is required" });
  }
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "princemahmud", (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }
      const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
      // File upload succeeded
      res.json({ message: "File uploaded successfully", fileUrl: fileUrl });
    });
  } else {
    res.sendStatus(401);
  }
};

//Send email using api

const sendMail = (req, res) => {
  const { to, subject, text } = req.body;

  // Validate the request data
  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "princemahmud", (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }
      // Send the email
      transporter.sendMail(
        {
          from: "top10web.info@gmail.com",
          to,
          subject,
          text,
        },
        (error, info) => {
          if (error) {
            console.error("Failed to send email", error);
            return res.status(500).json({ error: "Failed to send email" });
          }

          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "Email sent successfully" });
        }
      );
      // Email sent succeeded
      res.status(200).json({ message: "Email Sent successfully" });
    });
  } else {
    res.sendStatus(401);
  }
};

export { saveFile, sendMail };
