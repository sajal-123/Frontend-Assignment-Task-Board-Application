import { api } from './api';

export interface Task {
  title: string;
  description?: string;
  status?: string;
  columnId: string;
  priority?: string;
  dueDate?: string;
  createdBy?: string;
  assignedTo?: string[];
  order?: number;
}

export interface Column {
  title: string;
  description: string;
  boardId?: string;
  order?: number;
}

export interface Board {
  name: string;
}

// ===== BOARDS =====

export const fetchBoards = async () => {
  const { data } = await api.get('/boards/get-boards');
  return data;
};

export const createBoard = async (payload: Partial<Board>) => {
  console.log('Creating board with payload:', payload);
  const { data } = await api.post('/boards/create-board', payload);
  return data;
};

export const deleteBoard = async (boardId: string) => {
  const { data } = await api.delete(`/boards/${boardId}`);
  return data;
};

// ===== COLUMNS =====

export const fetchColumns = async (boardId: string) => {
  const { data } = await api.get(`/columns/${boardId}`);
  return data;
};

export const createColumn = async ({
  boardId,
  payload,
}: {
  boardId: string;
  payload: Partial<Column>;
}) => {
  console.log('Creating column with payload:', payload, 'for boardId:', boardId);
  const { data } = await api.post(`/columns/${boardId}`, payload);
  return data;
};

// ===== TASKS =====

export const fetchTasks = async (columnId?: string) => {
  const { data } = await api.get(`/tasks${columnId ? `?columnId=${columnId}` : ''}`);
  return data;
};

export const createTask = async (payload: Partial<Task>) => {
  console.log('Creating task with payload:', payload);
  const { data } = await api.post(`/tasks${payload.columnId}`, payload);
  return data;
};

export const updateTask = async ({
  taskId,
  updates,
}: {
  taskId: string;
  updates: Partial<Task>;
}) => {
  const { data } = await api.patch(`/tasks/${taskId}`, updates);
  return data;
};
