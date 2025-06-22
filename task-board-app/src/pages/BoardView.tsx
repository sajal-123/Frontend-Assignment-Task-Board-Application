import { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import BoardCardView from '../components/BoardCardView';
import BoardListView from '../components/BoardListView';
import { useUserStore } from '../store/user.store';
import { useFetchBoards, useCreateBoard } from '../hooks/task.queries';
import Modal from '../components/ui/Modal';
import ColumnForm from '../components/ColumnForm';
import { Button } from '../components/ui/Button';

const BoardView = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [boards, setBoards] = useState<any[]>([]);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useUserStore();
  const fetchBoardMutation = useFetchBoards();
  const createBoardMutation = useCreateBoard();

  useEffect(() => {
    const saved = localStorage.getItem('boardViewMode') as 'grid' | 'list' | null;
    if (saved) setView(saved);
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchBoardMutation.mutate(undefined, {
      onSuccess: (data) => setBoards(data.data),
      onError: (error) => console.error('❌ Error fetching boards:', error),
    });
  }, [user]);

  const handleCreateBoard = (title: string) => {
    createBoardMutation.mutate(
      { name: title },
      {
        onSuccess: (data) => setBoards((prev) => [...prev, data]),
        onError: (error) => console.error('❌ Error creating board:', error),
      }
    );
  };

  // 🔍 Filter boards based on search term
  const filteredBoards = boards.filter((board) =>
    board.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Boards</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your projects and collaborate efficiently.
          </p>
        </div>
        <Button onClick={() => setShowBoardForm(true)}>
          + Create Board
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="🔍 Search boards..."
          className="w-full md:max-w-md px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.setItem('boardViewMode', 'grid');
              setView('grid');
            }}
            className={`p-2 rounded-md transition ${view === 'grid'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              localStorage.setItem('boardViewMode', 'list');
              setView('list');
            }}
            className={`p-2 rounded-md transition ${view === 'list'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Board Creation Modal */}
      {showBoardForm && (
        <Modal onClose={() => setShowBoardForm(false)}>
          <ColumnForm onAdd={handleCreateBoard} showForm={showBoardForm} setShowForm={setShowBoardForm} />
        </Modal>
      )}

      {/* Filtered Boards */}
      <div className={view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
        {filteredBoards.map((board) =>
          view === 'grid' ? (
            <BoardCardView key={board._id} {...board} />
          ) : (
            <BoardListView key={board._id} {...board} />
          )
        )}
      </div>
    </div>
  );
};

export default BoardView;
