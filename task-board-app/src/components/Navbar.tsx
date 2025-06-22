import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const loggedIn = !!user;

  return (
    <header className="bg-white dark:bg-gray-900 px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <h1
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer tracking-wide hover:opacity-90 transition"
          onClick={() => navigate('/')}
        >
          TaskBoard
        </h1>

        {/* Auth/User Actions */}
        <AnimatePresence mode="wait">
          {loggedIn ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <img
                src={`https://i.pravatar.cc/150?u=${user.username}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                Hi, <span className="font-semibold">{user.username}</span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => navigate('/auth?mode=login')}
                className="px-5 py-2 text-sm font-medium border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className="px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
              >
                Sign Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;
