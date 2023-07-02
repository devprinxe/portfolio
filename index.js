import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth_router.js";
import serviceRoutes from "./router/service_router.js";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Express Configuration
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Static File Access
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger configuration options
const swaggerOptions = {
  definition: {
    info: {
      title: "My API",
      description: "API documentation using Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./router/*.js"], // Directory containing your route files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

//Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", authRoutes);
app.use("/api/v1", serviceRoutes);

//Server Configuration
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
