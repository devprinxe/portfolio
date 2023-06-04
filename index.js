import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth_router.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
