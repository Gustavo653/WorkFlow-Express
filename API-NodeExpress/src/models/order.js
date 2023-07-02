const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Priority = require("./priority");
const Status = require("./status");
const User = require("./user");
const SupportGroup = require("./supportGroup");
const Category = require("./category");

const Order = sequelize.define("Order", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  openingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  closingDate: {
    type: DataTypes.DATE,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
});

Order.belongsTo(Priority, { foreignKey: "priorityId" });
Order.belongsTo(Category, { foreignKey: "categoryId" });
Order.belongsTo(Status, { foreignKey: "statusId" });
Order.belongsTo(User, { foreignKey: "requesterId", as: "requester" });
Order.belongsTo(User, { foreignKey: "agentId", as: "agent" });
Order.belongsTo(SupportGroup, { foreignKey: "supportGroupId" });

module.exports = Order;
