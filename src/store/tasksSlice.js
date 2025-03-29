import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: []
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
    }
  }
});

export const { addTask, updateTask, deleteTask, setTasks, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
