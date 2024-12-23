import { Router } from "express";
import {
  createOrUpdateUser,
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} from "./user.service.js";
import isEmailExists from "../../middleware/isEmailExists.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", isEmailExists, createUser);
userRouter.get("/by-email", getUserByEmail);
userRouter.put("/:id", createOrUpdateUser);
userRouter.get("/:id", getUserById);

export default userRouter;
