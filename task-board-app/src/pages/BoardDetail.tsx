import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import ColumnofTask from '../components/Column';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import ColumnForm from '../components/ColumnForm';
import TaskForm from '../components/taskForm';
import Modal from '../components/ui/Modal';
import type { Column } from '../@types';
import {
    useCreateTask,
    useCreateColumn,
    useFetchColumns,
} from '../hooks/task.queries';
import { useUserStore } from '../store/user.store';
import { showError } from '../utils/ToastUtils';

const BoardDetail: React.FC = () => {
    const { id: boardId } = useParams(); // <-- ✅ Get boardId from URL

    const { user } = useUserStore();
    const [columns, setColumns] = useState<Column[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<null | string>(null);

    const fetchColumnMutation = useFetchColumns();
    const createTaskMutation = useCreateTask();
    const createColumnMutation = useCreateColumn();
    const navigate = useNavigate();
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (!boardId) return;

        fetchColumnMutation.mutate(boardId, {
            onSuccess: (data) => {
                console.log('✅ Columns fetched successfully:', data.data);
                setColumns(data.data);
            },
            onError: (error) => {
                console.error('❌ Error fetching columns:', error);
            },
        });
    }, []);


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = columns.findIndex((col) => col._id === active.id);
        const newIndex = columns.findIndex((col) => col._id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const newColumns = arrayMove(columns, oldIndex, newIndex);
            setColumns(newColumns);
        }
    };

    const handleAddTask = ({
        columnId, title, description, dueDate, priority, order, assignedTo,
    }: {
        columnId: string;
        title: string;
        description: string;
        dueDate: string;
        priority: string;
        order: number;
        assignedTo: string,
    }) => {
        console.log('Adding task with params:', { columnId, title, description, dueDate, priority, order, assignedTo });

        createTaskMutation.mutate({
            title,
            description,
            columnId,
            assignedTo: [assignedTo],
            createdBy: user?._id,
            dueDate: dueDate,
            priority,
            order
        }, {
            onSuccess: (data) => {
                console.log('✅ Task created successfully:', data);
                setColumns((prev) =>
                    prev.map((col) =>
                        col._id === columnId ? { ...col, tasks: [...col.tasks, data.data] } : col
                    )
                );
            },
            onError: (error) => {
                showError(`Error creating task ${error.message}`);
            },
        });
        setSelectedColumnId(null);
    };

    const handleAddColumn = (title: string, description: string) => {
        if (!boardId) return;
        console.log('Creating column with title:', title, description, 'for boardId:', boardId);

        createColumnMutation.mutate(
            { boardId, payload: { title, description, boardId } }, // 👈 wrap both
            {
                onSuccess: (data) => {
                    console.log('✅ Column created successfully:', data);
                    setColumns((prev) => [...prev, data.data]);
                },
                onError: (error) => {
                    console.error('❌ Error creating column:', error);
                },
            }
        );

        setShowForm(false);
    };


    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                    <Button
                        onClick={() => setShowForm(true)}
                    >
                        + Create Column
                    </Button>
                </div>

            </div>

            {/* DnD Columns */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columns.map((col) => col._id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                        {columns.map((col) => (
                            <ColumnofTask key={col._id} col={col} setSelectedColumnId={setSelectedColumnId} />
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
                    />
                </Modal>
            )}

            {/* Column Modal */}
            {showForm && (
                <Modal onClose={() => setShowForm(false)}>
                    <ColumnForm
                        onAdd={handleAddColumn}
                        showForm={showForm}
                        setShowForm={setShowForm}
                    />
                </Modal>
            )}
        </div>
    );
};

export default BoardDetail;
