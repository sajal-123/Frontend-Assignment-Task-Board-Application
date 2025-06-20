import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react'
import SortableColumnWrapper from './ui/sortableColumnWrapper';
import TaskCard from './TaskCard';

interface Props {
    setSelectedColumnId: (selectColumnId: string | null) => void;
    col: {
        id: string;
        title: string;
        tasks: {
            id: string;
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
        <SortableColumnWrapper key={col.id} id={col.id}>
            {({ attributes, listeners }) => (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg w-72 min-w-[18rem] flex flex-col gap-3">
                    <div className='flex justify-between items-center mb-4'>
                        <h2
                            {...attributes}
                            {...listeners}
                            className="font-bold text-gray-800 dark:text-white cursor-move"
                        >
                            {col.title}
                        </h2>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Clicked + in column", col.id);
                                setSelectedColumnId(col.id);
                            }}
                            className="text-sm border w-10 border-dashed border-gray-400 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 py-2 transition"
                        >
                            +
                        </button>
                    </div>

                    <SortableContext
                        items={col.tasks.map(task => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {col.tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </div>
            )}
        </SortableColumnWrapper>
    )
}

export default Column