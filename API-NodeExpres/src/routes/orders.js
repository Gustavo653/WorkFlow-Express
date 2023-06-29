const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/order");

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      openingDate,
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
      requesterId = verifyToken(req.headers.authorization).id,
    } = req.body;
    const order = await Order.create({
      title,
      description,
      openingDate,
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
      requesterId,
    });
    res.status(201).json(order);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao criar o chamado.",
      detail: error,
    });
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os chamados.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Chamado não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter o chamado.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      openingDate,
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
    } = req.body;

    const updatedOrder = await Order.update(
      {
        title,
        description,
        openingDate,
        priorityId,
        agentId,
        categoryId,
        supportGroupId,
      },
      { where: { id: id } }
    );
    if (updatedOrder[0] === 1) {
      res.json({ message: "Chamado atualizado com sucesso." });
    } else {
      return res.status(404).json({ message: "Chamado não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o chamado.",
      detail: error,
    });
  }
});

module.exports = router;
