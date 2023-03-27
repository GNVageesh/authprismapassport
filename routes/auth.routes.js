import express from "express";
import passport from "../config/setup.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/protected");
    });
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/failed" }),
  (req, res) => {
    req.session.loggedIn = true;
    res.redirect("/protected");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

export default router;
