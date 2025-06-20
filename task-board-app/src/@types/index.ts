// models/types.ts
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  dueDate: string;
  priority: Priority;
  columnId:string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  columns: Column[];
  tasks: Record<string, Task>; // tasks mapped by ID
}
