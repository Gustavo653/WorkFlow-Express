const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./user");

const SupportGroup = sequelize.define("SupportGroup", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

SupportGroup.belongsToMany(User, { through: "GroupUser" });
User.belongsToMany(SupportGroup, { through: "GroupUser" });

module.exports = SupportGroup;
