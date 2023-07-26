
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleToggleTask,
  handleRatingChange,
}) => {
  const [ratings, setRatings] = useState({});

  const updateRating = (taskId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [taskId]: rating,
    }));
    handleRatingChange(taskId, rating); // Call the prop function here
  };

  if (!tasks || tasks.length === 0) {
    return <h2>Task List</h2>;
  }

  return (
    <div>
      <div className="row justify-content-center align-items-center">
        {tasks.map((task) => (
          <div className="col-md-4 p-2 my-2" key={task._id}>
            <div className="card rounded-0">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{task.title}</h5>
                <Button
                  onClick={() => handleEditTask(task._id)}
                  className="btn btn-sm"
                >
                  Edit
                </Button>
              </div>
              <div className="card-body">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task._id)}
                />
                <p>Description: {task.content}</p>
                <p>Date: {task.date}</p>
                <div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={ratings[task._id] || 0}
                    onChange={(e) =>
                      updateRating(task._id, parseInt(e.target.value))
                    }
                  />
                  <span>{ratings[task._id] || 0}%</span>
                </div>
              </div>
              <div className="card-footer">
                <Button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;