import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Example
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    toggleTask(state, action) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      });
  },
});

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;