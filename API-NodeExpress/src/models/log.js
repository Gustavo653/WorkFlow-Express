const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Log = sequelize.define("Log", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("network", "error", "info"),
    allowNull: false,
  },
});

module.exports = Log;
