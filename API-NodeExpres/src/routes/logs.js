const express = require("express");
const router = express.Router();
const log = require("../models/log");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    let logs = await log.findAll({
      order: [["id", "DESC"]],
      limit: 1000,
    });

    res.json(logs);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os logs.",
      detail: error,
    });
  }
});

module.exports = router;
