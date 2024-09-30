// App.jsx
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import DailyOverview from './components/DailyOverview';
import Notification from './components/Notification';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [notification, setNotification] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.completed) {
        triggerNotification(`Task "${task.name}" is completed!`);
      }
    });
  }, [tasks]);

  return (
    <div>
      <h1>Time Block Task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} triggerNotification={triggerNotification} />
      <DailyOverview tasks={tasks} />
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}


export default App;
