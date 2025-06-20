import type { Request, Response } from "express";
import Board from "../models/board.model";
import Column from "../models/Column.model";
import Task from "../models/Task.model";
import { ApiError } from "../utils/APIError";
import { ApiResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { notifyClients } from "../app";

export const createBoard = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Board name is required");
  }

  const board = await Board.create({
    name,
    createdBy: req.user?._id, // Assuming req.user is populated by auth middleware
  });

  return res
    .status(201)
    .json(new ApiResponse(201, board, "Board created successfully"));
});

export const deleteBoard = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ApiError(400, "Board ID is required");
  }

  // Step 1: Find and delete the board
  const board = await Board.findOneAndDelete({
    _id: boardId,
    createdBy: req.user?._id, // restrict to board creator
  });

  if (!board) {
    throw new ApiError(404, "Board not found or unauthorized");
  }

  // Step 2: Find all columns related to the board
  const columns = await Column.find({ boardId });

  const columnIds = columns.map((col) => col._id);

  // Step 3: Delete all tasks related to those columns
  await Task.deleteMany({ columnId: { $in: columnIds } });

  // Step 4: Delete all columns
  await Column.deleteMany({ boardId });

  return res
    .status(200)
    .json(new ApiResponse(200, board, "Board and all related data deleted successfully"));
});



// CREATE COLUMN
export const createColumn = asyncHandler(async (req: Request, res: Response) => {
  const { boardId, title, description, order } = req.body;

  if (!boardId || !title || order === undefined) {
    throw new ApiError(400, "Board ID, title, and order are required");
  }

  const column = await Column.create({
    boardId,
    title,
    description,
    order,
    createdAt: new Date(),
  });

  res.status(201).json(new ApiResponse(201, column, "Column created successfully"));
});


// UPDATE COLUMN
export const updateColumn = asyncHandler(async (req: Request, res: Response) => {
  const { columnId } = req.params;
  const { name } = req.body;

  const column = await Column.findByIdAndUpdate(
    columnId,
    { name },
    { new: true }
  );

  if (!column) throw new ApiError(404, "Column not found");

  res.status(200).json(new ApiResponse(200, column, "Column updated successfully"));
});

// DELETE COLUMN
export const deleteColumn = asyncHandler(async (req: Request, res: Response) => {
  const { columnId } = req.params;

  const column = await Column.findByIdAndDelete(columnId);
  if (!column) throw new ApiError(404, "Column not found");

  await Task.deleteMany({ columnId });

  res.status(200).json(new ApiResponse(200, column, "Column and related tasks deleted"));
});


// CREATE TASK
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const {
    columnId,
    title,
    description,
    assignedTo = [],
    priority = "medium",
    dueDate,
    order,
  } = req.body;

  if (!columnId || !title || order === undefined) {
    throw new ApiError(400, "Column ID, title, and order are required");
  }

  const task = await Task.create({
    columnId,
    title,
    description,
    createdBy: req.user?._id,
    assignedTo,
    priority,
    dueDate,
    order,
    createdAt: new Date(),
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

// UPDATE TASK
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updateData = req.body;

  const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  notifyClients({ type: 'taskUpdated', task: task });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});


// DELETE TASK
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task deleted successfully"));
});
