import { Calendar, User, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const BoardListView = ({ _id, name, createdAt, createdBy }: BoardListProps) => (
  <Link to={`/board/${_id}`} className="block">
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition flex gap-4 items-start">
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
    </div>
  </Link>
);

export default BoardListView;
