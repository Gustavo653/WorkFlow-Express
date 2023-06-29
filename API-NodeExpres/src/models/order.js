const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Priority = require("./priority");
const Status = require("./status");
const User = require("./user");
const SupportGroup = require("./supportGroup");

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
});

Order.belongsTo(Priority, { foreignKey: "priorityId" });
Order.belongsTo(Status, { foreignKey: "statusId" });
Order.belongsTo(User, { foreignKey: "requesterId" });
Order.belongsTo(User, { foreignKey: "agentId" });
Order.belongsTo(SupportGroup, { foreignKey: "supportGroupId" });

module.exports = Order;
