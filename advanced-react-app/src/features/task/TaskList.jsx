import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "./taskSlice";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const TaskList = () => {
  const { tasks, status } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  useLocalStorage("tasks", tasks);

  const completedCount = useMemo(() => {
    return tasks.filter(t => t.completed).length;
  }, [tasks]);

  return (
    <div className="app-container">
      <h2>Task Manager</h2>
      <TaskForm />
      <p>Completed: {completedCount}</p>
      {status === "loading" && <p>Loading...</p>}
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;