import { useMutation } from '@tanstack/react-query';
import {
  createBoard,
  fetchBoards,
  deleteBoard,
  createColumn,
  fetchColumns,
  createTask,
  fetchTasks,
  updateTask,
} from '../services/task.service';

// Boards
export const useCreateBoard = () =>
  useMutation({ mutationFn: createBoard });

export const useFetchBoards = () =>
  useMutation({ mutationFn: fetchBoards });

export const useDeleteBoard = () =>
  useMutation({ mutationFn: deleteBoard });

// Columns
export const useCreateColumn = () =>
  useMutation({ mutationFn: createColumn });

export const useFetchColumns = () =>
  useMutation({ mutationFn: fetchColumns });

// Tasks
export const useCreateTask = () =>
  useMutation({ mutationFn: createTask });

export const useFetchTasks = () =>
  useMutation({ mutationFn: fetchTasks });

export const useUpdateTask = () =>
  useMutation({ mutationFn: updateTask });
