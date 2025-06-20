import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggleButton } from './ui/ToggleTheme';
import { ThemeContext } from '../themeContext';

function Navbar() {
  const loggedIn = false; // Replace with your actual auth logic
  const { theme } = useContext(ThemeContext); // Optional: useful if needed for additional logic

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Brand */}
      <h1 className="text-xl font-bold tracking-wide">Task Board</h1>

      {/* Theme Toggle */}
      <ThemeToggleButton />

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
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm">Hi, User</span>
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
            <button className="btn btn-secondary text-sm px-4 py-1.5">
              Login
            </button>
            <button className="btn btn-primary text-sm px-4 py-1.5">
              Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
