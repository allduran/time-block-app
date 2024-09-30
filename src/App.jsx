import useLocalStorage from './hooks/useLocalStorage';
import TaskInput from './components/TaskInput';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Time Block Task Manager</h1>
      <TaskInput addTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} - {task.time} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
