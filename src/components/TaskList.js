import React from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Typography } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, isMobile }) => {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No tasks found. Add a new task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    // <Droppable droppableId="tasks">
    <div>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            // <Draggable key={task.id} draggableId={task.id} index={index}>
            <div>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{ mb: 2 }}
                >
                  <TaskItem
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    isMobile={isMobile}
                  />
                </Box>
              )}
              </div>
            // </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
      </div>
    // </Droppable>
  );
};

export default TaskList;