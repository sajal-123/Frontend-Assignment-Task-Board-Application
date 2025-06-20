import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type {Task}  from '../@types';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-4 rounded-md border mb-3 shadow hover:shadow-md"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <div className="text-xs text-gray-400 mt-2 flex justify-between">
        <span>{task.priority}</span>
        <span>{task.dueDate}</span>
        <span>{task.assignedTo}</span>
      </div>
    </div>
  );
};

export default TaskCard;
