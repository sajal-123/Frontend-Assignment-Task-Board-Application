import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Circle } from "lucide-react";
import type { Task } from "../@types";

interface Props {
  task: Task;
}

const getPriorityStyle = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return {
        border: "border-red-500",
        dot: "text-red-500",
        badge:
          "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
      };
    case "medium":
      return {
        border: "border-yellow-500",
        dot: "text-yellow-500",
        badge:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
      };
    case "low":
    default:
      return {
        border: "border-green-500",
        dot: "text-green-500",
        badge:
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
      };
  }
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // e.g., June 27, 2025
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { border, dot, badge } = getPriorityStyle(task.priority);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing
        bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border-l-4 ${border}
        flex flex-col p-4 space-y-1`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-gray-800 dark:text-white text-base leading-snug flex-1">
          {task.title}
        </h3>
        <Circle className={`w-4 h-4 ${dot}`} fill="currentColor" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {task.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className={`px-2 py-0.5 rounded-full ${badge}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
          📅 Due: {formatDate(task.dueDate)}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
          👤 {task.assignedTo}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
