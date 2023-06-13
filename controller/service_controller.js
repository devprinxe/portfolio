import { conn } from "../configuration/database.js";
import { transporter } from "../configuration/email_config.js";
const saveFile = (req, res) => {
    if (req.fileValidationError) {
      // Print the error message
      console.error(req.fileValidationError);
      // Return an error response to the client
      return res.status(400).json({ error: req.fileValidationError });
    }
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    // File upload succeeded
    res.json({ message: 'File uploaded successfully', "fileUrl": fileUrl});
  };
const sendMail = (req,res) => {

    const { to, subject, text } = req.body;

    // Validate the request data
    if (!to || !subject || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Send the email
    transporter.sendMail(
        {
          from: 'top10web.info@gmail.com',
          to,
          subject,
          text,
        },
        (error, info) => {
          if (error) {
            console.error('Failed to send email', error);
            return res.status(500).json({ error: 'Failed to send email' });
          }
  
          console.log('Email sent:', info.response);
          return res.status(200).json({ message: 'Email sent successfully' });
        }
      );
};
  export { saveFile, sendMail };