// TaskItem.jsx
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Button from "./Button";

function TaskItem({ task, index, updateTask, deleteTask, triggerNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    time: task.time,
  });

  const [remainingTime, setRemainingTime] = useState(task.time * 60);
  const [isActive, setIsActive] = useState(false);
  const [notifiedTasks, setNotifiedTasks] = useState(new Set());

  useEffect(() => {
    let timer;

    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      if (!notifiedTasks.has(task.name)) {
        triggerNotification(`Time's up for ${task.name}!`);
        setNotifiedTasks((prev) => new Set(prev).add(task.name));
      }
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, remainingTime, task.name, triggerNotification, notifiedTasks]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateTask(index, editedTask);
    setIsEditing(false);
  };

  const handleCompleteToggle = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(index, updatedTask);
    if (updatedTask.completed) {
      setNotifiedTasks((prev) => new Set([...prev].filter((taskName) => taskName !== task.name)));
    }
  };

  const handleStartTimer = () => {
    setRemainingTime(task.time * 60);
    setIsActive(true);
  };

  const handleStopTimer = () => {
    setIsActive(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editedTask.time}
            onChange={(e) =>
              setEditedTask({ ...editedTask, time: Number(e.target.value) })
            }
          />
          <Button onClick={handleSave} type="primary">
            Save
          </Button>
          <Button onClick={handleEditToggle} type="secondary">
            Cancel
          </Button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCompleteToggle}
          />
          {index + 1}. {task.name} - {task.time} minutes{" "}
          {task.completed ? "(Completed)" : ""}
          <Button onClick={handleEditToggle} type="primary">
            Edit
          </Button>
          <Button onClick={() => deleteTask(index)} type="secondary">
            Delete
          </Button>
          <div>
            <span>
              {Math.max(Math.floor(remainingTime / 60), 0)}:
              {("0" + (remainingTime % 60)).slice(-2)}
            </span>
            {!isActive ? (
              <Button onClick={handleStartTimer} type="primary">
                Start Timer
              </Button>
            ) : (
              <Button onClick={handleStopTimer} type="secondary">
                Stop Timer
              </Button>
            )}
          </div>
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
  triggerNotification: PropTypes.func.isRequired,
};

export default TaskItem;
