import { useRouter } from 'next/navigation';

export default function TaskCard({ task, onEdit, onDelete }) {
  const router = useRouter();

  return (
    <div
      className={`bg-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-200 p-4 mb-4 rounded-lg shadow-md flex justify-between items-center`}
    >
      <div className="flex flex-col">
        <span className="font-medium">{task.title}</span>
        <span className="text-xs text-gray-600">{task.dueDate}</span>
      </div>
      <div className="flex gap-2 text-sm">
        <button
          onClick={() => onEdit(task._id, task.title)}
          className="text-blue-600 hover:text-blue-700"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
