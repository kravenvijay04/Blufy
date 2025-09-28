import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const _dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const web = express();
const PORT = process.env.PORT || 5000;

web.use(cors({
    origin: process.env.APPLICATION_URL,
    credentials: true
}));

web.use(express.json({ limit: "5mb" }));
web.use(cookieParser());
web.use(express.urlencoded({ extended: true }));

web.use("/api/auth", authRoute);
web.use("/api/users", userRoute);
web.use("/api/posts", postRoute);
web.use("/api/notifications", notificationRoute);

if (process.env.NODE_ENV === "production") {
    web.use(express.static(path.join(_dirname, "/client/dist")));
    web.use("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
    });
}

web.get("/", (req, res) => {
    res.send("Hello World");
});

const startServer = async () => {
    try {
        await connectDB();
        web.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

startServer();
