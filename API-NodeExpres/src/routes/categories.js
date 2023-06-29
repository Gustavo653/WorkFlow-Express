const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const group = await Category.create({ name });
      res.status(201).json(group);
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao criar a categoria.",
        detail: error,
      });
    }
  }
);

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const groups = await Category.findAll();
    res.status(200).json(groups);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter as categorias.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Category.findByPk(id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Categoria não encontrada." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter a categoria.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await Category.findByPk(id);
    if (group) {
      group.name = name;
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Categoria não encontrada." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar a categoria.",
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
      const group = await Category.findByPk(id);
      if (group) {
        await group.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Categoria não encontrada." });
      }
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao excluir a categoria.",
        detail: error,
      });
    }
  }
);

module.exports = router;
