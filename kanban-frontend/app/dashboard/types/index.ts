export interface Task {
  _id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Columns {
  todo: Task[];
  'in-progress': Task[];
  completed: Task[];
}

export interface TaskFormData {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DragResult {
  destination: {
    droppableId: string;
    index: number;
  } | null;
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  type: string;
  mode: string;
} 