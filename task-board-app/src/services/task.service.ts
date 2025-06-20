// src/services/task.service.ts
import { api } from './api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  columnId: string;
  // add more if needed
}

export interface Column {
  _id: string;
  name: string;
  boardId: string;
}


export const fetchTasks = async () => {
  const { data } = await api.get('/tasks');
  return data;
};

export const createTask = async (payload: any) => {
  const { data } = await api.post('/tasks', payload);
  return data;
};

export const createColumn = async (payload: any) => {
  const { data } = await api.post('/columns', payload);
    return data;
}

export const updateTask = async ({
  taskId,
  updates,
}: {
  taskId: string;
  updates: any;
}) => {
  const { data } = await api.patch(`/tasks/${taskId}`, updates);
  return data;
};
