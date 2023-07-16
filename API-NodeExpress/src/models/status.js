const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Status = sequelize.define("Status", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Status;
