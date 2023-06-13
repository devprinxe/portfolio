import express from "express";
import { saveFile } from "../services/file_upload_service.js";
import multer from "multer";
import { conn } from "../configuration/database.js";
import path from "path";

const serviceRoutes= express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

  serviceRoutes.post("/file-upload", upload.single("file"), saveFile);

  export default serviceRoutes;