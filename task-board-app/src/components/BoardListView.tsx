import { Calendar, User, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BoardListProps {
  id: number;
  title: string;
  description: string;
  date: string;
  owner: string;
}

const BoardListView = ({ id, title, description, date, owner }: BoardListProps) => (
  <Link to={`/board/${id}`} className="block">
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
        <div className="flex items-center gap-4 text-gray-500 text-sm mt-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{owner}</span>
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white self-start">
        <LayoutGrid className="w-5 h-5" />
      </div>
    </div>
  </Link>
);

export default BoardListView;
