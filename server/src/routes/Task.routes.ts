// src/routes/task.routes.ts
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  createColumn,
  getAllColumnsByBoard,
  createTask,
  updateTask
} from "../controllers/task.controller";

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

// Routers
const BoardRoute = Router();
const ColumnRoute = Router();
const TaskRoute = Router();

// ==== BOARD ROUTES ====

BoardRoute.post("/create-board", verifyJWT, createBoard);               // POST /boards/create-board
BoardRoute.get("/get-boards", verifyJWT, getAllBoards);                 // GET /boards/get-boards
BoardRoute.delete("/:boardId", verifyJWT, deleteBoard);                // DELETE /boards/:boardId

// ==== COLUMN ROUTES ====

ColumnRoute.post("/:boardId", verifyJWT, createColumn);                         // POST /columns
ColumnRoute.get("/:boardId", verifyJWT, getAllColumnsByBoard);            // GET /columns/:boardId

// ==== TASK ROUTES ====

TaskRoute.post("/", verifyJWT, createTask);                             // POST /tasks
TaskRoute.patch("/:taskId", verifyJWT, updateTask);                     // PATCH /tasks/:taskId

// Exporting routes
export {
  BoardRoute,
  ColumnRoute,
  TaskRoute
};
