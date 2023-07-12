const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Order = require("./order");

const OrderAttachment = sequelize.define("OrderAttachment", {
  uniqueIdentifier: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  extension: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

OrderAttachment.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderAttachment;
