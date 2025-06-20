// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import BoardView from './pages/BoardView';
import BoardDetail from './pages/BoardDetail';
import Layout from './Layout';
import { useEffect } from 'react';
import { useGetCurrentUser } from './hooks/user.queries';
import { useUserStore } from './store/user.store';

const App = () => {
  const { data: user, isSuccess } = useGetCurrentUser();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
    }
  }, [isSuccess, user, setUser]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <BoardView />
          </Layout>
        }
      />
      <Route
        path="/board/:id"
        element={
          <Layout>
            <BoardDetail />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
