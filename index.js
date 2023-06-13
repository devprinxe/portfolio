import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth_router.js";
import serviceRoutes from "./router/service_router.js";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";


//Express Configuration
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());



//Static File Access
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", serviceRoutes);



//Server Configuration
app.listen(3000, () => {
    console.log("Server running on port 3000");
})
