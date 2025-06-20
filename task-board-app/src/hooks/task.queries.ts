import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  createTask,
  updateTask,
  createColumn
} from '../services/task.service';

export const useFetchTasks = () =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};


export const  useCreateColumn = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['columns'] });
    },
  });
}