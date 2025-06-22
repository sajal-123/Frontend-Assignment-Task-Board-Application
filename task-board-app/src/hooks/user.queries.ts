// src/hooks/user.queries.ts
import { useMutation } from '@tanstack/react-query';
import { getCurrentUser, loginUser, registerUser } from '../services/user.service';

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
