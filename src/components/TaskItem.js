import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Checkbox, 
  TextField, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Chip 
} from '@mui/material';
import { Edit, Delete, DragIndicator } from '@mui/icons-material';

// Helper function to format dates without date-fns
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
};

const TaskItem = ({ task, onUpdateTask, onDeleteTask, isMobile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const renderViewMode = () => {
    return (
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              color="primary"
            />
          </Grid>
          
          <Grid item xs>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {task.title}
            </Typography>
            
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
            
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              {task.dueDate && (
                <Chip
                  size="small"
                  label={`Due: ${formatDate(task.dueDate)}`}
                  variant="outlined"
                />
              )}
              
              <Chip
                size="small"
                label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                color={getPriorityColor(task.priority)}
              />
            </Box>
          </Grid>
          
          {!isMobile && (
            <Grid item>
              <Box sx={{ display: 'flex' }}>
                <IconButton size="small" onClick={handleEdit}>
                  <Edit fontSize="small" />
                </IconButton>
                
                <IconButton size="small" onClick={handleDelete}>
                  <Delete fontSize="small" />
                </IconButton>
                
                <IconButton size="small">
                  <DragIndicator fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          )}
          
          {isMobile && (
            <Grid item>
              <Box sx={{ display: 'flex' }}>
                <IconButton size="small" onClick={handleEdit}>
                  <Edit fontSize="small" />
                </IconButton>
                
                <IconButton size="small" onClick={handleDelete}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    );
  };

  const renderEditMode = () => {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Task Title"
              fullWidth
              value={editedTask.title}
              onChange={handleChange}
              required
              margin="dense"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={editedTask.description}
              onChange={handleChange}
              margin="dense"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              value={editedTask.dueDate ? editedTask.dueDate.substring(0, 10) : ''}
              onChange={handleChange}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    );
  };

  return (
    <Card 
      variant="outlined" 
      sx={{
        borderLeft: `4px solid ${theme => theme.palette[getPriorityColor(task.priority)].main}`,
        opacity: task.completed ? 0.8 : 1
      }}
    >
      {isEditing ? renderEditMode() : renderViewMode()}
    </Card>
  );
};

export default TaskItem;