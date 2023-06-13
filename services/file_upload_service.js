import express from "express";

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

  export { saveFile };