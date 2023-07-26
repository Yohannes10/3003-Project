import React from "react";

// Delete component for rendering a delete button
const Delete = ({ handleDeleteTask, taskId }) => {
  // Function to handle the delete action
  const handleDelete = () => {
    // Call the provided handleDeleteTask function with the taskId parameter
    handleDeleteTask(taskId);
  };

  return (
    // Render a button with the handleDelete function as the onClick event handler
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default Delete;
