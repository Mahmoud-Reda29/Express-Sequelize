import { Router } from "express";
import { createBulkComments } from "./comments.service.js";

const commentsRouter = Router();

commentsRouter.post("/", createBulkComments);





export default commentsRouter;