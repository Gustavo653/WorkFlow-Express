const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const user = require("./user"); 

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "title" não pode estar vazio.',
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "content" não pode estar vazio.',
      },
    },
  },
});

Post.belongsTo(user, { as: "author", foreignKey: "authorId" });

const Comment = sequelize.define("comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "content" não pode estar vazio.',
      },
    },
  },
});

Comment.belongsTo(user, { as: "author", foreignKey: "authorId" });
Comment.belongsTo(Post);
Post.hasMany(Comment);

const Reaction = sequelize.define("reaction", {
  type: {
    type: DataTypes.ENUM("like", "dislike"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "type" não pode estar vazio.',
      },
      isIn: {
        args: [["like", "dislike"]],
        msg: 'O campo "type" deve ser "like" ou "dislike".',
      },
    },
  },
});

Reaction.belongsTo(user, { as: "author", foreignKey: "authorId" });
Reaction.belongsTo(Post);
Post.hasMany(Reaction);

module.exports = { Post, Comment, Reaction };
