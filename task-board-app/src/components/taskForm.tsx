import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetAllUsers } from '../hooks/user.queries';

interface TaskFormProps {
  columnId: string;
  onAdd: (params: {
    columnId: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    order: number;
    assignedTo: string;
  }) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ columnId, onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [order, setOrder] = useState(0);
  const [assignedTo, setAssignedTo] = useState('');
  const { data, isLoading, isError } = useGetAllUsers();
  const users = data?.data || [];


  useEffect(() => {
    if (users.length > 0) {
      // console.log('✅ Users fetched successfully:', users);
      setAssignedTo(users[0].username);
    }
  }, [users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ columnId, title, description: desc, dueDate, priority, order, assignedTo });
    onClose();
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        📝 Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Task details"
            rows={3}
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
          >
            <option value="high">🔥 High</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">🧊 Low</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
          />
        </div>

        {/* Assigned To */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => {
              const selectedId = e.target.value;
              console.log('Selected user ID:', selectedId);
              setAssignedTo(selectedId);
            }}
            disabled={isLoading || isError}
            className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
          >
            {isLoading && <option>Loading users...</option>}
            {isError && <option>Error loading users</option>}
            {!isLoading && !isError && data?.data?.map((user: any) => (
              <option key={user._id} value={user._id}>
                👤 {user.username}
              </option>
            ))}
          </select>
        </div>



        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:brightness-110 transition-all"
          >
            ➕ Add Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;
