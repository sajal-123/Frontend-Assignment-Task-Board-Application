import { Calendar, User, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BoardCardProps {
  _id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const BoardCardView = ({ _id, name, createdAt, createdBy }: BoardCardProps) => (
  <Link to={`/board/${_id}`} className="block">
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Click to open this board.</p>
        </div>
        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <LayoutGrid className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mt-4">
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
);

export default BoardCardView;
