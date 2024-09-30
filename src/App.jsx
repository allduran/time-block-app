// App.jsx
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import DailyOverview from "./components/DailyOverview";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [notifications, setNotifications] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const triggerNotification = (message) => {
    setNotifications((prev) => {
      if (!prev.includes(message)) {
        return [...prev, message];
      }
      return prev;
    });
  
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };
  

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed);
    completedTasks.forEach((task) => {
      triggerNotification(`Task "${task.name}" is completed!`);
    });
  }, [tasks]);
  

  return (
    <div className="app-container">
      <div className="task-section">
        <h1>Time Block Task Manager</h1>
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          triggerNotification={triggerNotification}
        />
      </div>
      <div className="sidebar">
        <DailyOverview tasks={tasks} />
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            message={notification}
            onClose={() =>
              setNotifications((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
