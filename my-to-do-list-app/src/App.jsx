import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch mock data from an API when the app loads
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await response.json();
        const formattedData = data.map(task => ({
          id: task.id,
          text: task.title,
          completed: task.completed
        }));
        setTasks(prevTasks => [...prevTasks, ...formattedData]);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };
    
    fetchMockData();
  }, []);

  // Load tasks from local storage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (newTask) => {
    if (newTask.trim() !== "") {
      const newTaskObject = { id: Date.now(), text: newTask, completed: false };
      setTasks(prevTasks => [...prevTasks, newTaskObject]);
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove a task
  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Undo task deletion (restore last deleted task)
  const [lastDeleted, setLastDeleted] = useState(null);

  const handleUndo = () => {
    if (lastDeleted) {
      setTasks(prevTasks => [...prevTasks, lastDeleted]);
      setLastDeleted(null);
    }
  };

  // Modify removeTask to store the last deleted task
  const removeTaskWithUndo = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setLastDeleted(taskToDelete);
    removeTask(id);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

        {/* Task Form */}
        <TaskForm addTask={addTask} />

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="filter" className="mr-2">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTaskWithUndo}
        />

        {/* Undo Button */}
        {lastDeleted && (
          <button
            onClick={handleUndo}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Undo Last Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
