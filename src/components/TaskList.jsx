import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </ul>
  );
}

// Define PropTypes for the component
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TaskList;
