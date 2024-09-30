//TaskItem.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';

function TaskItem({ task, index, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: task.name, time: task.time });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateTask(index, editedTask);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          />
          <input
            type="number"
            value={editedTask.time}
            onChange={(e) => setEditedTask({ ...editedTask, time: Number(e.target.value) })}
          />
          <Button onClick={handleSave} type="primary">Save</Button>
          <Button onClick={handleEditToggle} type="secondary">Cancel</Button>
        </>
      ) : (
        <>
          {index + 1}. {task.name} - {task.time} minutes {task.completed ? '(Completed)' : ''}
          <Button onClick={handleEditToggle} type="primary">Edit</Button>
          <Button onClick={() => deleteTask(index)} type="secondary">Delete</Button>
        </>
      )}
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
