import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import connectDB from "./db/connectDB.js"
dotenv.config();
const web = express();
const PORT = process.env.PORT

web.get("/", (req, res) => {
    res.send("Hello World");
})

web.use(express.json());
web.use("/api/auth", authRoute);

web.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDB();
})