import { api } from './api';

export const getCurrentUser = async () => {
  const { data } = await api.post('/user/current-user');
  return data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/user/login', payload);
  return data;
};
