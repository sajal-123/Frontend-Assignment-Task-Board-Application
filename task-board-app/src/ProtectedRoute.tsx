// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUserStore } from "./store/user.store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  if (!user) return <Navigate to="/auth?mode=login" />;
  return <>{children}</>;
};

export default ProtectedRoute;
