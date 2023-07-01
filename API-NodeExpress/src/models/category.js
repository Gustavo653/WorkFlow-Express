const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
