const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const log = sequelize.define("log", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isIn: {
        args: [["network", "error", "info"]],
      },
    },
  },
});

module.exports = log;
