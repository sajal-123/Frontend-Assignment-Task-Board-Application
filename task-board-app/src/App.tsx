import { Routes, Route, Navigate } from 'react-router-dom';
import BoardView from './pages/BoardView';
import BoardDetail from './pages/BoardDetail';
import Layout from './Layout';
import Auth from './pages/(auth)';
import { useGetCurrentUser } from './hooks/user.queries';
import { useEffect, useState } from 'react';
import { useUserStore } from './store/user.store';

const App = () => {
  const getUserMutation = useGetCurrentUser();
  const { user, setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    getUserMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log('✅ Current user fetched successfully:', data);
        setUser(data.data);
        setLoading(false);
      },
      onError: (error) => {
        console.error('❌ Error fetching current user:', error);
        clearUser();
        setLoading(false);
      },
    });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
      
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/auth?mode=login"} />}
      />

      <Route
        path="/dashboard"
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
