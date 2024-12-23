import commentsRouter from "./modules/comments/comments.controller.js";
import postsRouter from "./modules/posts/posts.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter);
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });
};

export default bootstrap;
