import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && time > 0) {
      addTask({ name: task, time: Number(time), completed: false });
      setTask('');
      setTime(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minutes"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

// Define PropTypes for the component
TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;
