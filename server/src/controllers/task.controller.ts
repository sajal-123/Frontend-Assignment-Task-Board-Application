import type { Request, Response } from "express";
import Board from "../models/board.model";
import Column from "../models/Column.model";
import Task from "../models/Task.model";
import { ApiResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { notifyClients } from "../app";

// CREATE BOARD
export const createBoard = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Board name is required"));
  }

  const board = await Board.create({
    name,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, board, "Board created successfully"));
});

// UPDATE BOARD
export const deleteBoard = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;

  if (!boardId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Board ID is required"));
  }

  const board = await Board.findOneAndDelete({
    _id: boardId,
    createdBy: req.user?._id,
  });

  if (!board) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Board not found or unauthorized"));
  }

  const columns = await Column.find({ boardId });
  const columnIds = columns.map((col) => col._id);

  await Task.deleteMany({ columnId: { $in: columnIds } });
  await Column.deleteMany({ boardId });

  return res.status(200).json(
    new ApiResponse(200, board, "Board and all related data deleted successfully")
  );
});

// GET ALL BOARDS
export const getAllBoards = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized access"));
  }

  const boards = await Board.find({ createdBy: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, boards, "All boards fetched successfully"));
});

// CREATE COLUMN
export const createColumn = asyncHandler(async (req: Request, res: Response) => {
  const { boardId, title, description, order } = req.body;

  if (!boardId || !title || order === undefined) {
    return res.status(400).json(
      new ApiResponse(400, null, "Board ID, title, and order are required")
    );
  }

  // Check if the board exists
  const existingBoard = await Board.findById(boardId);
  if (!existingBoard) {
    return res.status(404).json(
      new ApiResponse(404, null, "Board not found")
    );
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

  if (!column) {
    return res.status(404).json(new ApiResponse(404, null, "Column not found"));
  }

  res.status(200).json(new ApiResponse(200, column, "Column updated successfully"));
});

// DELETE COLUMN
export const deleteColumn = asyncHandler(async (req: Request, res: Response) => {
  const { columnId } = req.params;

  const column = await Column.findByIdAndDelete(columnId);
  if (!column) {
    return res.status(404).json(new ApiResponse(404, null, "Column not found"));
  }

  await Task.deleteMany({ columnId });

  res.status(200).json(
    new ApiResponse(200, column, "Column and related tasks deleted")
  );
});

// GET ALL COLUMNS
export const getAllColumnsByBoard = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;

  if (!boardId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Board ID is required"));
  }

  const columns = await Column.find({ boardId }).sort({ order: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, columns, "Columns fetched successfully"));
});

// CREATE TASK
export const createTask = asyncHandler(async (req: Request, res: Response) => {

  const { columnId, title, description, assignedTo, priority, dueDate, order } = req.body;

  if (!columnId || !title || order === undefined) {
    return res.status(400).json(
      new ApiResponse(400, null, "Column ID, title, and order are required")
    );
  }

  const existingColumn = await Column.findById(columnId);
  if (!existingColumn) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Column not found"));
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

  res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// UPDATE TASK
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updateData = req.body;

  const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  notifyClients({ type: "taskUpdated", task });

  if (!task) {
    return res.status(404).json(new ApiResponse(404, null, "Task not found"));
  }

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

// DELETE TASK
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    return res.status(404).json(new ApiResponse(404, null, "Task not found"));
  }

  res.status(200).json(new ApiResponse(200, task, "Task deleted successfully"));
});
