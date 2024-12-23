import { Sequelize } from "sequelize";
import { Post, User, Comment } from "../../DB/models/index.js";

export const createPost = async (req, res) => {
  const { title, content, UserId } = req.body;
  try {
    const newPost = await Post.create({ title, content, UserId });
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { UserId } = req.query;
  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    if (post.UserId !== UserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });
    res.status(200).json({ posts });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getPostsWithCommentsCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [
          Sequelize.literal(`(
              SELECT COUNT(*)
              FROM comments
              WHERE comments.postId = Post.id
            )`),
          "commentsCount",
        ],
      ],
    });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
