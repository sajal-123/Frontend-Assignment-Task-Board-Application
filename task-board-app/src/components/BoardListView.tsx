import { Calendar, User, LayoutGrid, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface BoardListProps {
  _id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const BoardListView = ({ _id, name, createdAt, createdBy }: BoardListProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

  return (
    <div className="relative">
      <Link
        to={`/board/${_id}`}
        className="block rounded-lg p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm hover:shadow-md transition flex gap-4 items-start"
      >
        <div className="flex-shrink-0 p-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">Click to open this board</p>
          <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-xs mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{createdBy}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* 3-Dot Menu Button */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-28 rounded-lg bg-white dark:bg-gray-700 shadow-lg border dark:border-gray-600 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                alert('Edit clicked!');
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-700 dark:text-gray-200"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                alert('Delete clicked!');
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-red-600 dark:text-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardListView;
