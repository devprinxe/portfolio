import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth_router.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
