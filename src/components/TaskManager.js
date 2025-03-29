import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Typography, Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import {
  addTask,
  updateTask,
  deleteTask,
  setTasks,
  reorderTasks,
} from "../store/tasksSlice";

const TaskManager = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    }
  }, [dispatch]);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    dispatch(
      addTask({
        id: Date.now().toString(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    );
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const getFilteredAndSortedTasks = () => {
    return tasks
      .filter((task) => {
        // Filter by status
        if (filters.status === "completed" && !task.completed) return false;
        if (filters.status === "active" && task.completed) return false;

        // Filter by priority
        if (filters.priority !== "all" && task.priority !== filters.priority)
          return false;

        return true;
      })
      .sort((a, b) => {
        // Sort by selected criteria
        const sortField = filters.sortBy;
        let valueA = a[sortField];
        let valueB = b[sortField];

        // Convert dates to timestamps for comparison
        if (sortField === "dueDate" || sortField === "createdAt") {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        }

        // Sort order
        const direction = filters.sortOrder === "asc" ? 1 : -1;

        if (valueA < valueB) return -1 * direction;
        if (valueA > valueB) return 1 * direction;
        return 0;
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TaskForm onAddTask={handleAddTask} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          isMobile={isMobile}
        />
      </DragDropContext>
    </Paper>
  );
};

export default TaskManager;
