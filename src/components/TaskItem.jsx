import PropTypes from 'prop-types';

const TaskItem = ({ task, index }) => {
  return (
    <li>
      {index + 1}. {task.name} - {task.time} minutes {task.completed ? '(Completed)' : ''}
    </li>
  );
}

// Define PropTypes for the component
TaskItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskItem;
