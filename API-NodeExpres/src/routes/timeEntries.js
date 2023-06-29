const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const TimeEntry = require("../models/timeEntry");

router.post("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const {
      description,
      initialDate,
      finishDate,
      orderId,
      userId = verifyToken(req.headers.authorization).id,
    } = req.body;
    const group = await TimeEntry.create({
      description,
      initialDate,
      finishDate,
      orderId,
      userId,
    });
    res.status(201).json(group);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao criar o apontamento.",
      detail: error,
    });
  }
});

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const groups = await TimeEntry.findAll();
    res.status(200).json(groups);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os apontamentos.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await TimeEntry.findByPk(id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Apontamento não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter o apontamento.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await TimeEntry.findByPk(id);
    if (group) {
      group.name = name;
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Apontamento não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o apontamento.",
      detail: error,
    });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const group = await TimeEntry.findByPk(id);
      if (group) {
        await group.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Apontamento não encontrado." });
      }
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao excluir o apontamento.",
        detail: error,
      });
    }
  }
);

module.exports = router;
