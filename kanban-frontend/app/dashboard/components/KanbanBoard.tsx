'use client';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Columns, DragResult } from '../types';

interface KanbanBoardProps {
  columns: Columns;
  onDragEnd: (result: DragResult) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const columnConfig = {
  todo: { title: 'To Do', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  'in-progress': { title: 'In Progress', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  completed: { title: 'Completed', color: 'text-green-600', bgColor: 'bg-green-50' },
};

const priorityConfig = {
  high: { color: 'bg-red-100', border: 'border-red-200' },
  medium: { color: 'bg-yellow-100', border: 'border-yellow-200' },
  low: { color: 'bg-green-100', border: 'border-green-200' },
};

export const KanbanBoard = ({ columns, onDragEnd, onDelete, onEdit }: KanbanBoardProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd} mode="standard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(columns).map(([status, tasks]) => (
          <Droppable key={status} droppableId={status} isDropDisabled={false} isCombineEnabled={false}>
            {(provided, snapshot) => (
              <motion.div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-white p-6 rounded-lg shadow-lg min-h-[400px] transition-all duration-200 ${
                  snapshot.isDraggingOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="py-0 px-0 mb-4">
                    <CardTitle className={`text-xl font-semibold ${columnConfig[status as keyof typeof columnConfig].color}`}>
                      {columnConfig[status as keyof typeof columnConfig].title}
                    </CardTitle>
                    <div className="text-sm text-gray-500">
                      {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                  </CardHeader>
                  <CardContent className="py-0 px-0">
                    <AnimatePresence>
                      {tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index} isDragDisabled={false}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 mb-4 rounded-lg shadow-md flex justify-between items-center transition-all duration-200 ${
                                priorityConfig[task.priority].color
                              } ${priorityConfig[task.priority].border} ${
                                snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
                              }`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex flex-col flex-1 min-w-0">
                                <span className="font-medium text-gray-800 truncate">{task.title}</span>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    task.priority === 'high' ? 'bg-red-200 text-red-800' :
                                    task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                    'bg-green-200 text-green-800'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  {task.dueDate && (
                                    <span className="text-xs text-gray-600">
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1 ml-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onEdit(task._id, task.title)}
                                  className="p-1 h-auto hover:bg-gray-200"
                                  title="Edit task"
                                >
                                  ✏️
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDelete(task._id)}
                                  className="p-1 h-auto hover:bg-red-200"
                                  title="Delete task"
                                >
                                  ❌
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}; 