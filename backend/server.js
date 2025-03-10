import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connect from "./lib/mongodb.js";
import authRouter from "./router/authRoutes.js";
import messageRouter from "./router/messageRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Increase file size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/auth", authRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
    res.json({ "message": "hey there welcome" });
});

app.listen(port, () => {
    console.log("app is listening to port " + port);
    connect();
});
