import React from "react";
import { motion } from "framer-motion";

const TaskItem = ({ task, toggleTaskCompletion, removeTask }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      layout
      className="flex items-center justify-between p-3 border-b border-gray-200 bg-white shadow-md rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100"
    >
      <span
        className={`flex-1 text-lg font-medium transition-all duration-300 ${
          task.completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {task.text}
      </span>
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => toggleTaskCompletion(task.id)}
          className={`px-3 py-1 text-white font-semibold rounded-lg transition-all duration-300 ${
            task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => removeTask(task.id)}
          className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Remove
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
