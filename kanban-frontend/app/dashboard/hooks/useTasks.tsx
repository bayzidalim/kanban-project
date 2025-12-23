import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Task, Columns, TaskFormData, DragResult } from '../types';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    'in-progress': [],
    completed: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Organize tasks into columns
  const organizeTasksIntoColumns = useCallback((taskList: Task[]) => {
    const updatedColumns: Columns = {
      todo: [],
      'in-progress': [],
      completed: [],
    };
    taskList.forEach((task) => {
      if (updatedColumns[task.status]) {
        updatedColumns[task.status].push(task);
      }
    });
    return updatedColumns;
  }, []);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }

      const taskList = await taskService.fetchTasks();
      setTasks(taskList);
      const organizedColumns = organizeTasksIntoColumns(taskList);
      setColumns(organizedColumns);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
      
      if (errorMessage.includes('token') || errorMessage.includes('401')) {
        localStorage.removeItem('token');
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  }, [router, organizeTasksIntoColumns]);

  // Create task
  const createTask = useCallback(async (taskData: TaskFormData) => {
    if (!taskData.title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await taskService.createTask(taskData);
      await fetchTasks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  // Update task
  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      await taskService.updateTask(id, updates);
      await fetchTasks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  // Delete task
  const deleteTask = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  // Handle drag and drop
  const handleDragEnd = useCallback(async (result: DragResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const newStatus = destination.droppableId as Task['status'];
    await updateTask(draggableId, { status: newStatus });
  }, [updateTask]);

  // Handle task editing
  const handleEdit = useCallback(async (id: string, oldTitle: string) => {
    const newTitle = prompt('Edit Task Title:', oldTitle);
    if (!newTitle || !newTitle.trim()) {
      return;
    }

    await updateTask(id, { title: newTitle });
  }, [updateTask]);

  // Initialize on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    columns,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    handleDragEnd,
    handleEdit,
    fetchTasks,
  };
}; 