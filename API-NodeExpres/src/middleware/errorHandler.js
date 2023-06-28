const Log = require("../models/log");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor";
  try {
    const createdLog = await Log.create({
      message: JSON.stringify(err),
      type: "error",
    });
    const errorId = createdLog.id;
    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      errorId,
    });
  } catch (error) {
    console.error("Erro ao criar o log:", error);
    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      errorId: null,
    });
  }
};

module.exports = errorHandler;
