import { createBoard, deleteBoard } from "../controllers/task.controller";

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.route("/create-board").post(verifyJWT, createBoard);
router.route("/delete-board/:boardId").delete(verifyJWT, deleteBoard);

export default router;