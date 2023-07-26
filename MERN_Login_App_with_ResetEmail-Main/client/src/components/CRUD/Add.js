import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Add = ({ addTask }) => {
  // State variables to store the form inputs and their values
  const [tasks, setContent] = useState({
    title: "", // Task title
    description: "", // Task description
    date: new Date(), // Task date
    userSelected: "", // Selected user (if applicable)
    users: [], // List of users (if applicable)
    _id: "", // Task ID (if applicable)
  });
  const [title, setTitle] = useState(""); // Title input value

  // Function to handle date change
  const onChangeDate = (date) => setContent({ ...tasks, date });

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    addTask(title, tasks.description, tasks.date); // Call the provided addTask function with the task details
    setTitle(""); // Clear the title input value
    setContent({
      title: "",
      description: "",
      date: new Date(),
      userSelected: "",
      users: [],
      _id: "",
    }); // Clear the content state values
  };

  // Function to handle input change
  const onChange = (e) => {
    setContent({ ...tasks, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a Task</h4>
        <form onSubmit={onSubmit}>
          {/* Task Title */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />

            {/* Task Description */}
            <input
              type="text"
              className="form-control"
              placeholder="Task description"
              name="description"
              value={tasks.description}
              onChange={onChange}
              required
            />
          </div>

          {/* Task Date */}
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={tasks.date}
              onChange={onChangeDate}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="btn btn-primary">
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Add;
