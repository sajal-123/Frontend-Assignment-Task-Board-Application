// src/pages/Login.tsx
import { useLoginUser } from "../../hooks/user.queries";

const Login = () => {
  const loginMutation = useLoginUser();

  const handleLogin = () => {
    loginMutation.mutate({ email: 'test@example.com', password: '123456' });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
