const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const agentMiddleware = require("../middleware/agentMiddleware");
const Order = require("../models/order");
const { verifyToken } = require("../utils/jwtUtils");
const Status = require("../models/status");
const Priority = require("../models/priority");
const Category = require("../models/category");
const User = require("../models/user");
const SupportGroup = require("../models/supportGroup");
const { Op } = require("sequelize");

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
    } = req.body;
    const status = await Status.findOne({ where: { name: "Aberto" } });
    const statusId = status.dataValues.id;
    const requesterId = verifyToken(req.headers.authorization).id;

    const order = await Order.create({
      title,
      description,
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
      statusId,
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

router.get("/requester", authMiddleware, async (req, res, next) => {
  try {
    const {
      first,
      rows,
      sortOrder,
      sortField,
      filters,
      priorityId,
      categoryId,
      statusId,
      agentId,
      supportGroupId,
      search,
    } = req.query;

    const limit = rows ? parseInt(rows) : 10;
    const offset = first ? parseInt(first) : 0;
    const order = [];

    if (sortField) {
      const field = sortField.split(".");
      if (field.length === 2) {
        //const model = field[0];
        //const attribute = field[1];
        //order.push([
        //  { model: sequelize.models[model], attributes: [] },
        //  attribute,
        //  sortOrder == 1 ? "ASC" : "DESC",
        //]);
      } else {
        order.push([sortField, sortOrder == 1 ? "ASC" : "DESC"]);
      }
    }
    console.log(order);
    const options = {
      where: {
        requesterId: verifyToken(req.headers.authorization).id,
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      attributes: ["id", "title", "createdAt", "updatedAt", "closingDate"],
      include: [
        { model: Priority, where: priorityId ? { id: priorityId } : {} },
        { model: Category, where: categoryId ? { id: categoryId } : {} },
        { model: Status, where: statusId ? { id: statusId } : {} },
        {
          model: User,
          as: "requester",
        },
        {
          model: User,
          as: "agent",
          where: agentId ? { id: agentId } : {},
          required: false,
        },
        {
          model: SupportGroup,
          where: supportGroupId ? { id: supportGroupId } : {},
          required: false,
        },
      ],
      order,
      limit,
      offset,
    };
    console.log(options);
    const orders = await Order.findAndCountAll(options);

    res.status(200).json({
      first: offset,
      rows: limit,
      sortOrder: sortOrder == 1 ? "ASC" : "DESC",
      sortField: sortField || "",
      filters: filters ? JSON.parse(filters) : {},
      totalPages: Math.ceil(orders.count / limit),
      totalCount: orders.count,
      orders: orders.rows,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os chamados.",
      detail: error,
    });
  }
});

router.get(
  "/agent",
  authMiddleware,
  agentMiddleware,
  async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        where: { agentId: verifyToken(req.headers.authorization).id },
      });

      const ordersWithDescription = orders.map((order) => {
        const description = order.description.toString("utf8");
        return { ...order.toJSON(), description };
      });

      res.status(200).json(ordersWithDescription);
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao obter os chamados.",
        detail: error,
      });
    }
  }
);

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    const ordersWithDescription = orders.map((order) => {
      const description = order.description.toString("utf8");
      return { ...order.toJSON(), description };
    });

    res.status(200).json(ordersWithDescription);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os chamados.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
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
      priorityId,
      agentId,
      categoryId,
      supportGroupId,
    } = req.body;

    const updatedOrder = await Order.update(
      {
        title,
        description,
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
