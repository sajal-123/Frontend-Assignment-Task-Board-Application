import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ui/ToggleTheme";
import { useLocation, useNavigate } from "react-router-dom";

// Define routes and labels
const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Boards", path: "/" },
  { label: "Tasks", path: "/tasks" },
  { label: "Settings", path: "/settings" },
];

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [desktopMounted, setDesktopMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setDesktopMounted(true);
  }, [isMobile]);

  const SidebarContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 mt-6"
    >
      {menuItems.map(({ label, path }) => {
        const isActive = location.pathname === path || (path === "/" && location.pathname === "/"); // Handle homepage
        return (
          <motion.button
            key={label}
            onClick={() => {
              navigate(path);
              setIsOpen(false); // close sidebar on mobile
            }}
            className={`relative text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 group overflow-hidden
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white shadow"
                  : "bg-gray-50 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <span className="relative z-10">{label}</span>
            <span className="absolute top-0 left-[-75%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[-20deg] group-hover:animate-shine" />
          </motion.button>
        );
      })}
    </motion.div>
  );

  const sidebarWrapper = (
    <div className="h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4"
        >
          Task Manager
        </motion.h2>
        {SidebarContent}
      </div>
      <div className="mt-6">
        <ThemeToggleButton />
      </div>
    </div>
  );

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded absolute top-[12px] left-4 z-[101] hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>
      )}

      {!isMobile && desktopMounted && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden lg:block fixed left-0 top-0 h-full z-50"
        >
          {sidebarWrapper}
        </motion.div>
      )}

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 text-black dark:text-white z-[100] shadow-2xl"
          >
            <div className="flex justify-between items-center px-4 pt-4">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400"
              >
                Task Manager
              </motion.h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="w-6 h-6 text-black dark:text-white" />
              </button>
            </div>
            <div className="p-4">{SidebarContent}</div>
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
              <ThemeToggleButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
