// src/services/user.service.ts
import { api } from './api';

export const getCurrentUser = async () => {
  const { data } = await api.get('/users/current-user', {
    withCredentials: true,
  });
  console.log('Current User:', data.data);
  return data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/users/login', payload, {
    withCredentials: true,
  });
  return data;
};

export const registerUser = async (payload: { username: string, email: string; password: string }) => {
  const { data } = await api.post('/users/register', payload, {
    withCredentials: true,
  });
  return data;
};
