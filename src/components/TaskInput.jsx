//TaskInput.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TaskInput.css';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && time > 0) {
      addTask({ name: task, time: Number(time), completed: false });
      setTask('');
      setTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='task-input'>
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

TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;
