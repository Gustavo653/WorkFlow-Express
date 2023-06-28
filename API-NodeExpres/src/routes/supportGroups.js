const express = require("express");
const router = express.Router();
const SupportGroup = require("../models/supportGroup");
const User = require("../models/user");
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
      const group = await SupportGroup.create({ name });
      res.status(201).json(group);
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao criar o grupo de atendimento.",
        detail: error,
      });
    }
  }
);

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const groups = await SupportGroup.findAll();
    res.status(200).json(groups);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os grupos de atendimento.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await SupportGroup.findByPk(id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Grupo de atendimento não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os grupo de atendimento.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await SupportGroup.findByPk(id);
    if (group) {
      group.name = name;
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: "Grupo de atendimento não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o grupo de atendimento.",
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
      const group = await SupportGroup.findByPk(id);
      if (group) {
        await group.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Grupo de atendimento não encontrado." });
      }
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao excluir o grupo de atendimento.",
        detail: error,
      });
    }
  }
);

router.post(
  "/:groupId/users/:userId",
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { groupId, userId } = req.params;

      const group = await SupportGroup.findByPk(groupId);
      if (!group) {
        return res
          .status(404)
          .json({ error: "Grupo de suporte não encontrado." });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await group.addUser(user);

      res.status(200).json({
        message: "Usuário associado ao grupo de suporte com sucesso.",
      });
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao associar usuário ao grupo de suporte.",
        detail: error,
      });
    }
  }
);

module.exports = router;
