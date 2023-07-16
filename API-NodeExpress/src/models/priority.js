const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Priority = sequelize.define("Priority", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Priority;
