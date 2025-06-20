import { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import BoardCardView from '../components/BoardCardView';
import BoardListView from '../components/BoardListView';

const BoardView = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const saved = localStorage.getItem('boardViewMode') as 'grid' | 'list' | null;
    if (saved) setView(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('boardViewMode', view);
  }, [view]);

  const boards = [
    {
      id: 1,
      title: 'Hello',
      description: 'This is my first board',
      date: 'Jun 20, 2025',
      owner: 'Owner',
    },
    {
      id: 2,
      title: 'Marketing',
      description: 'Strategy planning board',
      date: 'Jun 21, 2025',
      owner: 'Team A',
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Boards</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your projects and collaborate with your team
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Create Board
        </button>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search boards..."
          className="input max-w-md"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-md transition ${
              view === 'grid'
                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-md transition ${
              view === 'list'
                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Board Views */}
      <div
        className={
          view === 'grid'
            ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {boards.map((board) =>
          view === 'grid' ? (
            <BoardCardView key={board.id} {...board} />
          ) : (
            <BoardListView key={board.id} {...board} />
          )
        )}
      </div>
    </div>
  );
};

export default BoardView;
