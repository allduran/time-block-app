import useLocalStorage from './hooks/useLocalStorage';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Time Block Task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
