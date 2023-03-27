import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 3000;

import authRouter from "./routes/auth.routes.js";
import genRouter from "./routes/site.routes.js";
import todoRouter from "./routes/todo.routes.js";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

import "./config/setup.js";

app.use("/", genRouter);
app.use("/api", authRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log("Server launched 🚀");
});
