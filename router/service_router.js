import express from "express";
import { upload } from "../services/file_upload_service.js";
import { saveFile, sendMail } from "../controller/service_controller.js";
import {
  fileUploadValidationRules,
  validateFile,
} from "../middleware/service_validation.js";

const serviceRoutes = express.Router();

serviceRoutes.post("/file-upload", upload.single("file"), saveFile);
serviceRoutes.post("/send-email", sendMail);

export default serviceRoutes;
