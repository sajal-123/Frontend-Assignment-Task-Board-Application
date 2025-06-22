import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ui/ToggleTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuStore } from "../store/menu.store";
import logo from "../assets/Logo.png";
const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Boards", path: "/" },
  { label: "Tasks", path: "/" },
  { label: "Settings", path: "/" },
];

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { isOpen, toggleMenu } = useMenuStore(); // 👈 Use global state

  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleMenu(); // Close sidebar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile, toggleMenu]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleMenu();
  };

  const renderMenuItems = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 mt-6"
    >
      {menuItems.map(({ label, path }) => {
        const isActive = location.pathname === path;
        return (
          <motion.button
            key={label}
            onClick={() => handleNavigation(path)}
            className={`relative text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 group overflow-hidden
              ${isActive
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

  const renderSidebarWrapper = (
    <div className="h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-auto mb-4"
        >
          <img
            src={logo}
            alt="Logo"
            className="lg:w-16 lg:h-16 w-12 h-12 inline-block mr-2"
          />
        </motion.div>
        {renderMenuItems}
      </div>
      <div className="mt-6">
        <ThemeToggleButton />
      </div>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden lg:block fixed left-0 top-0 h-full z-50"
        >
          {renderSidebarWrapper}
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
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate("/")}
                className="
    mt-2 ml-4 font-bold text-3xl cursor-pointer tracking-wide
    text-transparent bg-clip-text
    bg-gradient-to-r from-blue-600 via-white to-blue-600
    animate-[shimmer_3s_linear_infinite]
  "
                style={{
                  textShadow:
                    "1px 1px 0px rgba(0,0,0,0.25), 2px 2px 0px rgba(0,0,0,0.25), 3px 3px 5px rgba(0,0,0,0.15)",
                  backgroundSize: "200% 100%",
                }}
              >
                TaskBoard
              </motion.h1>
              <button
                onClick={toggleMenu}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="w-6 h-6 text-black dark:text-white" />
              </button>
            </div>
            <div className="p-4">{renderMenuItems}</div>
            <div className="p-4 fixed bottom-6 w-64 border-t border-gray-300 dark:border-gray-700">
              <ThemeToggleButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
