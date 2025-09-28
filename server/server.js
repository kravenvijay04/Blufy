import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import connectDB from "./db/connectDB.js"
import notificationRoute from "./routes/notification.route.js"
import cors from "cors"
// import path from "path"
dotenv.config();

// const _dirname = path.resolve();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const web = express();
const PORT = process.env.PORT

web.get("/", (req, res) => {
    res.send("Hello World");
})
web.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
web.use(express.json(
    {
        limit: "5mb"
    }
));
web.use(cookieParser());
web.use(express.urlencoded({
    extended: true
}))
web.use("/api/auth", authRoute);
web.use("/api/users", userRoute);
web.use("/api/posts", postRoute);
web.use("/api/notifications", notificationRoute)



    web.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
        connectDB();
    })