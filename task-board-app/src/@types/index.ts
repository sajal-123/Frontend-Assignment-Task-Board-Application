// models/types.ts
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  dueDate: string;
  priority: Priority;
  columnId?:string;
}

export interface Column {
  _id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Board {
  _id: string;
  name: string;
  createdBy: string;
}
