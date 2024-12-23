import { Comment } from "../../DB/models/index.js";

export const createBulkComments = async (req, res) => {
  const { comments, PostId , UserId } = req.body;
  try {
    const newComments = await Comment.bulkCreate(comments); 
    res
      .status(201)
      .json({
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
