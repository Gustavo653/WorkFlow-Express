const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Order = require("./order");
const User = require("./user");

const TimeEntry = sequelize.define("TimeEntry", {
  description: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

TimeEntry.belongsTo(Order, { foreignKey: "orderId" });
TimeEntry.belongsTo(User, { foreignKey: "userId" });

module.exports = TimeEntry;
