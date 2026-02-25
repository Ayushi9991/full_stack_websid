import { memo } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "./taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-item">
      <span
        onClick={() => dispatch(toggleTask(task.id))}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </button>
    </div>
  );
};

export default memo(TaskItem);