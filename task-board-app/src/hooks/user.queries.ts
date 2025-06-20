import { useQuery, useMutation } from '@tanstack/react-query';
import { getCurrentUser, loginUser } from '../services/user.service';

export const useGetCurrentUser = () =>
  useQuery({ queryKey: ['currentUser'], queryFn: getCurrentUser });

export const useLoginUser = () =>
  useMutation({ mutationFn: loginUser });
