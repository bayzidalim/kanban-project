import { useState } from 'react';

export default function Taskform({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [priority, setPriority] = useState(initialData.priority || 'low');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4">
      <input
        type="text"
        className="border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 rounded-lg mb-4 border focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Save Task
      </button>
    </form>
  );
}
