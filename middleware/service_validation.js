import { body, validationResult } from "express-validator";

const fileUploadValidationRules = [
  body("file").notEmpty().withMessage("File is required"),
];

const validateFile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { fileUploadValidationRules, validateFile };
