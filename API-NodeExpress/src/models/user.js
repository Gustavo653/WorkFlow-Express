const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const { generatePassword } = require("../utils/jwtUtils");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "firstName" não pode estar vazio.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "password" não pode estar vazio.',
      },
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "requester", "agent"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "role" não pode estar vazio.',
      },
      isIn: {
        args: [["admin", "requester", "agent"]],
        msg: 'O campo "role" deve ter um valor válido (admin, requester, agent).',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "lastName" não pode estar vazio.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'O campo "email" não pode estar vazio.',
      },
      isEmail: {
        msg: 'O campo "email" deve ser um endereço de e-mail válido.',
      },
    },
  },
});

module.exports = User;
