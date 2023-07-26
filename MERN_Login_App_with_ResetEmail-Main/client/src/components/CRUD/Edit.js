import React, { useState } from "react";

const Edit = ({ task, handleUpdateTask, handleCancelEdit }) => {
  // State variables to store the updated task details
  const [title, setTitle] = useState(task.title); // Updated task title
  const [description, setDescription] = useState(task.description); // Updated task description
  const [date, setDate] = useState(task.date); // Updated task date

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return; // Prevent updating with empty title
    handleUpdateTask(title); // Call the provided handleUpdateTask function with the updated title
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Updated Task Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter updated task title"
      />

      {/* Updated Task Description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter updated task description"
      ></textarea>

      {/* Updated Task Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Submit Button */}
      <button type="submit">Update Task</button>

      {/* Cancel Button */}
      <button type="button" onClick={handleCancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default Edit;
