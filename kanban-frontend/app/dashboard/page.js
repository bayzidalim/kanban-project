'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({ todo: [], 'in-progress': [], completed: [] });
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch tasks from the live backend (updated with live API URL)
  const fetchTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch('https://kanban-project-1bc1.onrender.com/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setTasks(data);
    else router.push('/');
  };

  // Handle task creation (updated with live API URL)
  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://kanban-project-1bc1.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, priority }),
    });
    if (res.ok) {
      setTitle('');
      setPriority('low');
      fetchTasks(); // Re-fetch tasks after creating a new one
    }
  };

  // Handle task deletion (updated with live API URL)
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`https://kanban-project-1bc1.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks(); // Re-fetch tasks after deleting one
  };

  // Handle task editing (updated with live API URL)
  const handleEdit = async (id, oldTitle) => {
    const newTitle = prompt('Edit Task Title:', oldTitle);
    if (!newTitle) return;

    const token = localStorage.getItem('token');
    await fetch(`https://kanban-project-1bc1.onrender.com/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });
    fetchTasks(); // Re-fetch tasks after editing
  };

  // Handle drag-and-drop task updates (updated with live API URL)
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId; // New task status (column)
    const token = localStorage.getItem('token');
    await fetch(`https://kanban-project-1bc1.onrender.com/api/tasks/${draggableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchTasks(); // Re-fetch tasks after drag-and-drop
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Organize tasks into columns
  useEffect(() => {
    const updatedColumns = { todo: [], 'in-progress': [], completed: [] };
    tasks.forEach((task) => updatedColumns[task.status]?.push(task));
    setColumns(updatedColumns);
  }, [tasks]);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Kanban Dashboard</h1>

      {/* Add New Task Section */}
      <div className="flex justify-center mb-6">
        <input
          className="border p-2 w-full max-w-xs rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="New Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="ml-4 p-2 rounded-lg shadow-md border focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          onClick={handleCreate}
          className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Add Task
        </button>
      </div>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(columns).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white p-6 rounded-lg shadow-lg min-h-[300px] transition-transform transform hover:scale-105 ${
                    status === 'todo'
                      ? 'bg-blue-100'
                      : status === 'in-progress'
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}
                >
                  <h2 className="text-xl font-semibold capitalize text-gray-800 mb-4">
                    {status.replace('-', ' ')}
                  </h2>
                  {columns[status].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          className={`bg-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-200 p-4 mb-4 rounded-lg shadow-md flex justify-between items-center`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{task.title}</span>
                            <span className="text-xs text-gray-600">{task.dueDate}</span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <button
                              onClick={() => handleEdit(task._id, task.title)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}
