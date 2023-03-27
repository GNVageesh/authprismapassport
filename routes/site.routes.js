import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get(
  "/protected",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  async (req, res) => {
    const allTodo = await prisma.todo.findMany({
      where: { user: req.user },
    });
    res.render("pages/protected", { user: req.user, data: allTodo.reverse() });
  }
);

router.get("/failed", (req, res) => {
  res.render("pages/failed");
});

router.get("/create", (req, res) => {
  res.render("pages/createNewItem");
});

export default router;
