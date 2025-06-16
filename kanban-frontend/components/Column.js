import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function Column({ status, tasks, onEdit, onDelete }) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-${status === 'todo' ? 'blue' : status === 'in-progress' ? 'yellow' : 'green'}-100 p-6 rounded-lg shadow-lg min-h-[300px] transition-transform transform hover:scale-105`}
        >
          <h2 className="text-xl font-semibold capitalize text-gray-800 mb-4">
            {status.replace('-', ' ')}
          </h2>
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
