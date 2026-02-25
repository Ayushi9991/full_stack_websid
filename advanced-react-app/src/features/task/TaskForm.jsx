import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./taskSlice";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  }, [title, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;