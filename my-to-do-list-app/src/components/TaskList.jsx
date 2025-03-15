import React from "react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskCompletion, removeTask }) => {
  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            removeTask={removeTask}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
