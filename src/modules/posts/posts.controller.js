import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostsWithCommentsCount } from "./posts.service.js";



const postsRouter = Router();

postsRouter.post("/", createPost);
postsRouter.delete("/:id", deletePost);
postsRouter.get("/details", getAllPosts);
postsRouter.get("/comment-count", getPostsWithCommentsCount)


export default postsRouter;
