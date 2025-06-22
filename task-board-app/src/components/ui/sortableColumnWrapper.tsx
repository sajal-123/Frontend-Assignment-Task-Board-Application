// SortableColumnWrapper.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface Props {
  id: string;
  children: (props: {
    attributes: any;
    listeners: any;
  }) => React.ReactNode;
}

const SortableColumnWrapper = ({ children, id }: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow min-w-[280px] max-w-sm"
    >
      {children({ attributes, listeners })}
    </div>
  );
};

export default SortableColumnWrapper;
