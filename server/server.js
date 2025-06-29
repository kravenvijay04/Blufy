import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import connectDB from "./db/connectDB.js"
import notificationRoute from "./routes/notification.route.js"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_sec: process.env.CLOUDINARY_API_SECRET_KEY
})
const web = express();
const PORT = process.env.PORT

web.get("/", (req, res) => {
    res.send("Hello World");
})

web.use(express.json());
web.use(cookieParser());
web.use("/api/auth", authRoute);
web.use("/api/users", userRoute);
web.use("/api/posts", postRoute);
web.use("/api/notifications", notificationRoute)

web.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDB();
})