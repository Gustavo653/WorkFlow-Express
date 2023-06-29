const express = require("express");
const router = express.Router();
const Status = require("../models/status");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const group = await Status.create({ name });
      res.status(201).json(group);
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao criar o status.",
        detail: error,
      });
    }
  }
);

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const groups = await Status.findAll();
    res.status(200).json(groups);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os status.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Status.findByPk(id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Status não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter o status.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await Status.findByPk(id);
    if (group) {
      group.name = name;
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Status não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o status.",
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
      const group = await Status.findByPk(id);
      if (group) {
        await group.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Status não encontrado." });
      }
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao excluir o status.",
        detail: error,
      });
    }
  }
);

module.exports = router;
