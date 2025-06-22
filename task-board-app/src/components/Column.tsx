import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableColumnWrapper from './ui/sortableColumnWrapper';
import TaskCard from './TaskCard';
import { Button } from './ui/Button';

interface Props {
    setSelectedColumnId: (id: string | null) => void;
    col: {
        _id: string;
        title: string;
        description: string;
        tasks: {
            _id: string;
            title: string;
            description: string;
            priority: 'high' | 'medium' | 'low';
            dueDate: string;
            assignedTo: string;
            createdBy: string;
        }[];
    };
}

function Column({ col, setSelectedColumnId }: Props) {
    return (
        <SortableColumnWrapper id={col._id}>
            {({ attributes, listeners }) => (
                <div
                    className="relative bg-gradient-to-br from-white via-blue-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 
             rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700 
             flex flex-col gap-4 w-full min-w-[270px] p-4 transition-all duration-300 hover:shadow-lg"
                >
                    {/* Colorful top bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-t-2xl" />

                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <h2
                            {...attributes}
                            {...listeners}
                            className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-100 
                 cursor-grab active:cursor-grabbing truncate max-w-[190px]"
                            title={col.title}
                        >
                            {col.title}
                        </h2>
                    </div>

                    {/* Optional description */}
                    {col.description && (
                        <p className="text-xs mt-[-16px] text-gray-500 dark:text-gray-400 truncate">
                            {col.description}
                        </p>
                    )}

                    {/* Task List */}
                    <SortableContext
                        id={`tasks-${col._id}`}
                        items={col.tasks.map((task) => task._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="flex flex-col gap-3">
                            {col.tasks.map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    </SortableContext>

                    {/* Add Task Button */}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColumnId(col._id);
                        }}
                    >
                        + Add Task
                    </Button>
                </div>

            )}
        </SortableColumnWrapper>
    );
}

export default Column;
