import React from 'react';
import { 
  Box, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';

const TaskFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              label="Sort By"
            >
              <MenuItem value="createdAt">Created Date</MenuItem>
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Order</InputLabel>
            <Select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleChange}
              label="Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskFilters;
