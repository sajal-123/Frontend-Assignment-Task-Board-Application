import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeContext } from "../themeContext";

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [desktopMounted, setDesktopMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // <lg
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setDesktopMounted(true);
    }
  }, [isMobile]);

  const menuItems = ["Dashboard", "Boards", "Tasks", "Settings"];

  const SidebarContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 text-base"
    >
      {menuItems.map((item) => (
        <motion.a
          key={item}
          href="#"
          className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-black dark:text-white font-medium shadow-soft hover:shadow-yellow-400/50 transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">{item}</span>
          {/* Shine animation */}
          <span className="absolute top-0 left-[-75%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[-20deg] group-hover:animate-shine" />
        </motion.a>
      ))}
    </motion.div>
  );

  const sidebarWrapper = (
    <div className="h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white p-6 shadow-lg">
      <motion.h2
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-title text-left"
      >
        Task Manager
      </motion.h2>
      {SidebarContent}
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded absolute top-[12px] left-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>
      )}

      {/* Desktop Sidebar with animation on first render */}
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

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 text-black dark:text-white z-[100] shadow-2xl"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="w-6 h-6 text-black dark:text-white" />
              </button>
            </div>
            {sidebarWrapper}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
