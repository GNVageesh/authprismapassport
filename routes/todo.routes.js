import express from "express";
import prisma from "../config/prisma.js";
import axios from "axios";

const router = express.Router();

router.post(
  "/new",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  async (req, res) => {
    const { title, desc } = req.body;

    if (!req.user) return res.redirect("/failed");

    const newItem = await prisma.user
      .update({
        where: { id: req.user.id },
        data: {
          todo: {
            create: {
              title,
              desc,
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/failed");
      });
    res.redirect("/protected");
  }
);

router.post("/del/:id", async (req, res) => {
  const id = req.params.id;

  await prisma.todo
    .delete({ where: { id } })
    .then(() => res.redirect("/protected"))
    .catch((e) => {
      console.log(e.message);
      res.redirect("/failed");
    });
});

export default router;
