//TaskList.jsx
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

function TaskList({ tasks, updateTask, deleteTask, triggerNotification }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          updateTask={updateTask}
          deleteTask={deleteTask}
          triggerNotification={triggerNotification}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  triggerNotification: PropTypes.func.isRequired,
};

export default TaskList;
