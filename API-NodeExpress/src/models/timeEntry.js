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
  type: {
    type: DataTypes.ENUM("requester", "agent"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "type" não pode estar vazio.',
      },
      isIn: {
        args: [["requester", "agent"]],
        msg: 'O campo "type" deve ter um valor válido (requester, agent).',
      },
    },
  },
});

TimeEntry.belongsTo(Order, { foreignKey: "orderId" });
Order.hasMany(TimeEntry, { foreignKey: "orderId" });
TimeEntry.belongsTo(User, { foreignKey: "userId" });

module.exports = TimeEntry;
