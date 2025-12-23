'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from './hooks/useTasks';
import { TaskForm, ErrorDisplay, LoadingSpinner, KanbanBoard } from './components';

export default function DashboardPage() {
  const {
    columns,
    loading,
    error,
    createTask,
    handleDragEnd,
    handleEdit,
    deleteTask,
  } = useTasks();

  const [dismissedError, setDismissedError] = useState<string | null>(null);

  const handleErrorDismiss = () => {
    setDismissedError(error);
  };

  // Determine the error message to display
  const errorMessage = error && error !== dismissedError ? error : null;

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Kanban Dashboard
        </h1>
      </motion.div>

      {/* Error Display */}
      <ErrorDisplay error={errorMessage} onDismiss={handleErrorDismiss} />

      {/* Task Form */}
      <TaskForm onSubmit={createTask} loading={loading} />

      {/* Kanban Board */}
      {loading ? (
        <LoadingSpinner message="Loading tasks..." size="lg" />
      ) : (
        <KanbanBoard
          columns={columns}
          onDragEnd={handleDragEnd}
          onDelete={deleteTask}
          onEdit={handleEdit}
        />
      )}

      {/* Empty State */}
      {!loading && Object.values(columns).every(tasks => tasks.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 text-lg mb-4">
            No tasks yet. Create your first task above!
          </div>
          <div className="text-gray-400 text-sm">
            Drag and drop tasks between columns to organize your workflow.
          </div>
        </motion.div>
      )}
    </main>
  );
}