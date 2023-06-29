const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Priority = require("./priority");

const Order = sequelize.define("Order", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  closingDate: {
    type: DataTypes.DATE,
  },
});

Order.belongsTo(Priority, { foreignKey: "priorityId" });

module.exports = Order;
