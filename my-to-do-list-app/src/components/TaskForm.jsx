import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(""); // State to handle error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    if (newTask.trim() === "") {
      setError("Task cannot be empty!"); // Set error message if input is empty
      return; // Exit the function early
    }

    // If input is valid, proceed
    addTask(newTask); // Call the addTask function passed from the parent
    setNewTask(""); // Clear the input field
    setError(""); // Clear any previous error message
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4">
      <div className="flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setError(""); // Clear error message when user starts typing
          }}
          placeholder="Add a new task"
          className={`flex-1 p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-l-lg focus:outline-none`}
        />
        <button
          type="submit"
          className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {/* Display error message if there is one */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default TaskForm;