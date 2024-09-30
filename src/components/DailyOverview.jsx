// DailyOverview.jsx
import PropTypes from 'prop-types';
import '../styles/DailyOverview.css';

const DailyOverview = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTime = tasks.reduce((sum, task) => sum + task.time, 0);
  const timeRemaining = totalTime - (completedTasks * Math.max(...tasks.map(task => task.time)));

  return (
    <div className="daily-overview">
      <h2>Daily Overview</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Total Time Allocated: {totalTime} minutes</p>
      <p>Time Remaining: {timeRemaining} minutes</p>
    </div>
  );
};

DailyOverview.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default DailyOverview;
