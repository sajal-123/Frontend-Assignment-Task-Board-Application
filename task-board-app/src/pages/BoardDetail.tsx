import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import ColumnForm from '../components/ColumnForm';
import TaskForm from '../components/taskForm';
import Modal from '../components/ui/Modal';
import ColumnofTask from '../components/Column';
import type { Column, Task } from '../@types';
import { useFetchTasks, useCreateTask, useCreateColumn } from '../hooks/task.queries';

const BoardDetail: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<null | string>(null);

    const { data: tasks, isSuccess } = useFetchTasks();
    const createTaskMutation = useCreateTask();
    const createColumnMutation = useCreateColumn();

    const navigate = useNavigate();
    const sensors = useSensors(useSensor(PointerSensor));

    // Map tasks into columns
    useEffect(() => {
        if (isSuccess && tasks) {
            const columnMap: Record<string, Column> = {};

            tasks.forEach((task: Task) => {
                if (!columnMap[task.columnId]) {
                    columnMap[task.columnId] = {
                        id: task.columnId,
                        title: 'Untitled Column',
                        tasks: [],
                    };
                }
                columnMap[task.columnId].tasks.push(task);
            });

            setColumns(Object.values(columnMap));
        }
    }, [isSuccess, tasks]);

    // EventSource for real-time updates
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/events');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'taskUpdated') {
                setColumns((prev) =>
                    prev.map((col) => ({
                        ...col,
                        tasks: col.tasks.map((t) =>
                            t.id === data.task.id ? data.task : t
                        ),
                    }))
                );
            }
        };
        return () => eventSource.close();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeIdx = columns.findIndex((col) => col.id === active.id);
        const overIdx = columns.findIndex((col) => col.id === over.id);

        if (activeIdx !== -1 && overIdx !== -1) {
            const reordered = arrayMove(columns, activeIdx, overIdx);
            setColumns(reordered);
        }
    };

    const handleAddTask = ({
        columnId,
        title,
        description,
    }: {
        columnId: string;
        title: string;
        description: string;
    }) => {
        createTaskMutation.mutate({
            title,
            description,
            columnId,
            assignedTo: 'You',
            createdBy: 'You',
            dueDate: 'N/A',
            priority: 'medium',
        });
        setSelectedColumnId(null);
    };

    const handleAddColumn = (title: string) => {
        createColumnMutation.mutate({ title });
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary text-sm flex items-center gap-1 px-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-1">
                        🗂️ Board Detail
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage tasks and columns for this board
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button onClick={() => setShowForm(true)} className="btn btn-primary text-sm shadow-md">
                        + Create Column
                    </Button>
                </div>
            </div>

            {/* DnD Columns */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columns.map((col) => col.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
                        {columns.map((col) => (
                            <ColumnofTask key={col.id} col={col} setSelectedColumnId={setSelectedColumnId} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Task Modal */}
            {selectedColumnId != null && (
                <Modal onClose={() => setSelectedColumnId(null)}>
                    <TaskForm
                        columnId={selectedColumnId}
                        onAdd={handleAddTask}
                        onClose={() => setSelectedColumnId(null)}
                        users={['Alice', 'Bob', 'Charlie']} // Replace with actual user list
                    />
                </Modal>
            )}

            {/* Column Modal */}
            {showForm && (
                <Modal onClose={() => setShowForm(false)}>
                    <ColumnForm onAdd={handleAddColumn} showForm={showForm} setShowForm={setShowForm} />
                </Modal>
            )}
        </div>
    );
};

export default BoardDetail;
