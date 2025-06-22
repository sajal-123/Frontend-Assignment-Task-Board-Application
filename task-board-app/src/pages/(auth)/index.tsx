// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "../../components/AuthForm";
import { useUserStore } from "../../store/user.store";

const Auth = () => {
    const { user,setUser } = useUserStore();

  useEffect(() => {
    document.title = "Task Board App - Auth";
    if (user) {
      // Redirect to home if user is already logged in
      navigate("/", { replace: true });
    }
  }, []);


  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract & validate mode from URL
  const modeParam = searchParams.get("mode");
  const isValidMode = modeParam === "signup" || modeParam === "login";
  const initialMode: "login" | "signup" = isValidMode ? (modeParam as "login" | "signup") : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  // Sync state with URL param on first render
  useEffect(() => {
    if (!isValidMode) {
      navigate("/auth?mode=login", { replace: true }); // Redirect to default if invalid
    } else {
      setMode(modeParam as "login" | "signup");
    }
  }, [modeParam, isValidMode, navigate]);

  // Switch mode and update query param
  const toggleMode = () => {
    const nextMode = mode === "login" ? "signup" : "login";
    navigate(`/auth?mode=${nextMode}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <AuthForm mode={mode} setUser={setUser} />
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="ml-2 font-medium text-blue-600 dark:text-blue-400 relative group"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
            <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-blue-600 dark:bg-blue-400"></span>
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
