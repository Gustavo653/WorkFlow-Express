const express = require("express");
const TimeEntry = require("../models/timeEntry");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { description, startTime, endTime, type, orderId, userId } = req.body;
    const timeEntry = await TimeEntry.create({
      description,
      startTime,
      endTime,
      type,
      orderId,
      userId,
    });
    res.status(201).json(timeEntry);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao criar apontamento.",
      detail: error,
    });
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const timeEntries = await TimeEntry.findAll();
    res.json(timeEntries);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao buscar os apontamentos.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const timeEntry = await TimeEntry.findByPk(id);
    if (timeEntry) {
      res.json(timeEntry);
    } else {
      res.status(404).json({ error: "TimeEntry não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao buscar o apontamento.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, startTime, endTime, type, orderId, userId } = req.body;
    const timeEntry = await TimeEntry.findByPk(id);
    if (timeEntry) {
      await timeEntry.update({
        description,
        startTime,
        endTime,
        type,
        orderId,
        userId,
      });
      res.json(timeEntry);
    } else {
      res.status(404).json({ error: "TimeEntry não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o apontamento.",
      detail: error,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const timeEntry = await TimeEntry.findByPk(id);
    if (timeEntry) {
      await timeEntry.destroy();
      res.json({ message: "TimeEntry excluído com sucesso." });
    } else {
      res.status(404).json({ error: "TimeEntry não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao excluir o apontamento.",
      detail: error,
    });
  }
});

module.exports = router;
