import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import router from "./router/Auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
import connect from "./lib/mongodb.js";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", router);

app.get("/", (req, res) => {
    res.json({ "message": "hey there welcome" });
});

app.listen(port, () => {
    console.log("app is listening to port " + port);
    connect();
});
