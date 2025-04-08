import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, isMobile }) => {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No tasks found. Add a new task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
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
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default TaskList;
