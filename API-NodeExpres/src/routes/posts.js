const express = require("express");
const router = express.Router();
const { Post, Comment, Reaction } = require("../models/post");
const { verifyToken } = require("../utils/jwtUtils");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/user");
const { literal } = require("sequelize");

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = verifyToken(req.headers.authorization).id;
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao criar o post.",
      detail: error,
    });
  }
});

router.get("/mine", authMiddleware, async (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.authorization);
    const posts = await Post.findAll({
      include: [
        { model: Comment },
        { model: Reaction },
        { model: User, as: "author", where: { id: decoded.id } },
      ],
    });
    res.json(posts);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os posts.",
      detail: error,
    });
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [{ model: User, as: "author" }],
          order: [["createdAt", "DESC"]],
        },
        { model: User, as: "author" },
      ],
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM reactions
              WHERE reactions.postId = post.id AND reactions.type = 'like'
            )`),
            "likeCount",
          ],
          [
            literal(`(
              SELECT COUNT(*)
              FROM reactions
              WHERE reactions.postId = post.id AND reactions.type = 'dislike'
            )`),
            "dislikeCount",
          ],
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter os posts.",
      detail: error,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [
        { model: Comment, include: User },
        { model: Reaction, include: User },
        { model: User, as: "author" },
      ],
    });
    if (post) {
      res.json(post);
    } else {
      return res.status(404).json({ message: "Post não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao obter o post.",
      detail: error,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(id);
    if (post) {
      post.title = title;
      post.content = content;
      await post.save();
      res.json(post);
    } else {
      return res.status(404).json({ message: "Post não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao atualizar o post.",
      detail: error,
    });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (post) {
        await post.destroy();
        res.json({ message: "Post excluído com sucesso." });
      } else {
        return res.status(404).json({ message: "Post não encontrado." });
      }
    } catch (error) {
      next({
        statusCode: 500,
        message: "Erro ao excluir o post.",
        detail: error,
      });
    }
  }
);

router.post("/:id/comments", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const authorId = verifyToken(req.headers.authorization).id;
    const post = await Post.findByPk(id);
    if (post) {
      const comment = await Comment.create({
        content,
        postId: post.id,
        authorId,
      });
      res.status(201).json(comment);
    } else {
      return res.status(404).json({ message: "Post não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao criar o comentário.",
      detail: error,
    });
  }
});

router.post("/:id/reactions", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const authorId = verifyToken(req.headers.authorization).id;
    const post = await Post.findByPk(id);

    if (post) {
      const existingReaction = await Reaction.findOne({
        where: {
          postId: post.id,
          authorId: authorId,
          type: type,
        },
      });

      if (existingReaction) {
        return res.status(400).json({ message: "Você já reagiu a este post." });
      }

      const reaction = await Reaction.create({
        type,
        postId: post.id,
        authorId,
      });
      res.status(201).json(reaction);
    } else {
      return res.status(404).json({ message: "Post não encontrado." });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao adicionar a reação.",
      detail: error,
    });
  }
});

module.exports = router;
