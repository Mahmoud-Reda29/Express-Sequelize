import { Router } from "express";
import {
  createBulkComments,
  findAndCountComments,
  getCommentByIdWithUserAndPost,
  getRecentCommentsForPost,
  updateCommentById,
  updateOrCreateComment,
} from "./comments.service.js";

const commentsRouter = Router();

commentsRouter.post("/", createBulkComments);
commentsRouter.patch("/:commentId", updateCommentById);
commentsRouter.get("/newest/:PostId", getRecentCommentsForPost);
commentsRouter.post("/find-or-create", updateOrCreateComment);
commentsRouter.get("/search", findAndCountComments);
commentsRouter.get("/details/:id", getCommentByIdWithUserAndPost);
export default commentsRouter;
