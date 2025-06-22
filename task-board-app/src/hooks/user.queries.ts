// src/hooks/user.queries.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUser, loginUser, registerUser,logoutUser,getAllUsers } from '../services/user.service';

export const useGetCurrentUser = () =>
  useMutation({
    mutationFn: getCurrentUser,
  });

export const useLoginUser = () =>
  useMutation({
    mutationFn: loginUser,
  });

export const useSignupUser = () =>
  useMutation({
    mutationFn: registerUser,
  });

export const useLogoutUser = () => 
  useMutation({
    mutationFn: logoutUser,
  });

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
