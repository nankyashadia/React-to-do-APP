import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask); // Call the addTask function passed from the parent
    setNewTask(""); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;