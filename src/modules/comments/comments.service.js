import { Op } from "sequelize";
import { Comment, Post, User } from "../../DB/models/index.js";

export const createBulkComments = async (req, res) => {
  const { comments, PostId, UserId } = req.body;
  try {
    const newComments = await Comment.bulkCreate(comments);
    res.status(201).json({
      message: "Comments created successfully",
      comments: newComments,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateCommentById = async (req, res) => {
  const { commentId } = req.params;
  const { content, UserId } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  if (!UserId) {
    return res.status(400).json({ message: "UserId is required" });
  }
  try {
    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.UserId !== UserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }
    comment.update({ content }, { where: { id: commentId } });
    res
      .status(200)
      .json({ message: "Comment updated successfully", comment: comment });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateOrCreateComment = async (req, res) => {
  const { PostId, UserId, content } = req.body;
  try {
    const [comment, created] = await Comment.findOrCreate({
      where: { PostId, UserId },
      defaults: { content },
    });
    if (!created) {
      comment.content = content || comment.content;
      await comment.save();
      return res
        .status(200)
        .json({ message: "Comment Found", comment: comment });
    }
    res
      .status(200)
      .json({ message: "Comment created successfully", comment: comment });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const findAndCountComments = async (req, res) => {
  const { word } = req.query;
  if (!word) {
    return res.status(400).json({ message: "Word  is required" });
  }

  try {
    const { count, rows } = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    res.status(200).json({
      message: "Comments retrieved successfully",
      count,
      comments: rows,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getRecentCommentsForPost = async (req, res) => {
  const { PostId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { PostId },
      limit: 3,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Recent comments retrieved successfully",
      comments,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(200)
      .json({ message: "Comment found successfully", comment: comment });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getCommentByIdWithUserAndPost = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment retrieved successfully",
      comment,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};
