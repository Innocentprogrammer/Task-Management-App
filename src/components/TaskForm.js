import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

// Simplified date handling without date-picker dependency
const initialTask = {
  title: '',
  description: '',
  dueDate: '',  // Changed to string format YYYY-MM-DD
  priority: 'medium'
};

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState(initialTask);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddTask(task);
      setTask(initialTask);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="title"
            label="Task Title"
            fullWidth
            value={task.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            value={task.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={1}
            value={task.description}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;