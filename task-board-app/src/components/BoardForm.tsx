import React, { useState } from 'react';

interface BoardFormProps {
  onCreate: (title: string, description: string) => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), desc.trim());
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Create Board</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Board title"
        className="input"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description (optional)"
        className="input"
        rows={3}
      />
      <button type="submit" className="btn btn-primary self-start text-sm px-4 py-2">
        Create
      </button>
    </form>
  );
};

export default BoardForm;
