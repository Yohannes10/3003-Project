import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskList from "./TaskList";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Add from "./Add";
import Edit from "./Edit";
import "../Extra/Navbar.css"
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Extra/Sidebar"
import styles from "../styles/Username.module.css"


const ParentComponent = () => {
  // manages the state of logged in or not -> initial state is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // manages the state of registered or not -> initial state is false
  const [isRegistered, setIsRegistered] = useState(false);
  // manages the state of the tasks
  const [tasks, setTasks] = useState([]);
  // manages the state of the task being edited
  const [editTask, setEditTask] = useState(null);
  const [prevTasks, setPrevTasks] = useState([]);


  const [ratings, setRatings] = useState({});

  // asynchronous function that handles the adding of tasks - has one parameter
  const addTask = async (title, description, date) => {
    try {
      // get token
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if the token is present and not null
  
      // sends POST request to API with token and task in the request body
      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });
  
      console.log("Response:", response); // Check the response object received from the server
  
      // handle different response status codes
      // ...
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  

  // asynchronous function that handles the registration submission - has two parameters
  const handleRegister = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.status === 200) {
        // alert the user
        alert("User registered successfully.");
        // Update the state to indicate successful registration
        setIsRegistered(true);
        // if the response was a Bad Request
      } else if (response.status === 400) {
        const data = await response.json();
        // log  the error
        console.log("Registration failed:", data.error);
        // alert the user
        alert("Registration failed!");
        // if the response code was Forbidden
      } else if (response.status === 403) {
        // log  the error
        console.log("Registration forbidden: User not allowed.");
        // alert the user
        alert("Registration forbidden: Username has to end with '@gmail.com'.");
      } else {
        // log the error
        console.log("Registration failed with status:", response.status);
        // alert the user
        alert("Username already exists!");
      }
    } catch (error) {
      // log the error
      console.error("Error during registration:", error.message);
    }
  };

  // asynchronous function that handles the login submission - has two parameters
  const handleLogin = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.ok) {
        const data = await response.json();
        // saves the authentication token in local storage
        localStorage.setItem("token", data.token);
        // sets the logged in state to true -> displays the logged in view
        setIsLoggedIn(true);
      } else {
        // if there was an error
        const errorData = await response.json();
        // log the error
        console.error("Login failed:", errorData.message);
        // alert the user
        alert("Login failed: Invalid username or password");
      }
      // if there was an error
    } catch (error) {
      // log the error
      console.error("Error logging in:", error);
      // alert the user
      alert("Login forbidden: Username has to end with '@gmail.com'.");
    }
  };

  useEffect(() => {
    const checkRegistrationStatus = () => {
      // retrieves the token value
      const token = localStorage.getItem("token");
      // shorthand way of of converting the token value to a boolean
      // if the token is true (not empty) the status is evaluated to true and vice versa
      setIsRegistered(!!token);
    };
    // function is called
    checkRegistrationStatus();
  }, []);

  // only fetch the tasks once the user has logged in
  useEffect(() => {
    // if the user is logged in
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if the token is present and not null


      // asynchronous function that handles the fetching of tasks
      const fetchTasks = async () => {
        try {
          // retrive token from storage
          const token = localStorage.getItem("token");

          // GET request to API along with the token to authorise user
          const response = await fetch("http://localhost:8080/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // convert the data
          const data = await response.json();
          // if there are tasks set the state to the data
          setTasks(data);
        } catch (error) {
          // log the error
          console.error("Error fetching tasks:", error);
        }
      };
      // function is called
      fetchTasks();
    }
  }, [isLoggedIn]);

  // asynchronous function that handles the deletion of a task - has one parameters
  const handleDeleteTask = async (taskId) => {
    try {
      // sends DELETE request to API with the task ID
      await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      // updates the tasks sate by filtering out the deleted task
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // function that handles the selceted task to be edited - has one parameter
  const handleEditTask = (taskId) => {
    // searches for the task in the array that maches the given taskId
    const taskToEdit = tasks.find((task) => task._id === taskId);
    // sets the state to the task that matches the given taskId
    if (taskToEdit) {
      setEditTask(taskToEdit);
    }
  };

  // cancels the editing of a task by resetting the Edit state to null
  const handleCancelEdit = () => {
    setEditTask(null);
  };

    // asynchronous function that handles the updating of a task with the edited information
    const handleUpdateTask = async (updatedTitle) => {
      try {
        if (!editTask) {
          throw new Error("No task to update.");
        }
    
        const { _id: taskId, description, date, completed } = editTask;
        console.log("Updated Task Data:", taskId, updatedTitle, description, date, completed);
    
        const response = await fetch(`/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            description,
            date,
            completed,
          }),
        });
    
        if (response.ok) {
          const updatedTaskData = await response.json();
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === taskId ? updatedTaskData : task))
          );
          setEditTask(null);
        } else {
          throw new Error("Error updating task");
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
    

  // asynchronous function that handles the toggle of a checkbox and completed status - has one parameter
  const handleToggleTask = async (taskId) => {
    try {
      // creates a new array by mapping over the tasks array and toggling the status of the task
      const updatedTasks = tasks.map(
        (task) =>
          // for each task in the arry it checks if the id property matches the taskId parameter
          task._id === taskId ? { ...task, completed: !task.completed } : task
        // if they match it creates a new object using the spread operator if not it returns the original task
      );

      // updates the task state by calling the setTasks function and passing the new array as the state
      setTasks(updatedTasks);

      // sends a PUT request to the API with the taskId
      await fetch(`http://localhost:8080/tasks/${taskId}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // contains the updated completed status in the request body
        body: JSON.stringify(updatedTasks.find((task) => task._id === taskId)),
      });
    } catch (err) {
      // logs the error
      console.error(err);
    }
  }; 

  const handleRatingChange = (taskId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [taskId]: rating,
    }));
  };
   
  // function to allow the user to logout
  const handleLogout = () => {
    // set logged in to false
    setIsLoggedIn(false);
    // clear the token form the storage
    localStorage.removeItem("token");
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
  <div>
          {isLoggedIn && <Sidebar />} {/* Render the Sidebar component only when isLoggedIn is true */}
        <div className="container">
          {isRegistered ? (
            <>
              {isLoggedIn ? ( 
                <>
                  <Button
                    style={{ position: "absolute", top: "15px", right: "20px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Addtask" element={<Add addTask={addTask} />} />
                     <Route
                      path="/ShowTask"
                      element=
                        {tasks.length > 0 && (
                          <TaskList
                            tasks={tasks}
                            handleDeleteTask={handleDeleteTask}
                            handleEditTask={handleEditTask}
                            handleToggleTask={handleToggleTask}
                            handleRatingChange={handleRatingChange}
                          />
                        )}
                      
                    />
                  </Routes>
                  {editTask && (
  <Edit
    task={editTask}
    handleUpdateTask={handleUpdateTask}
    handleCancelEdit={handleCancelEdit}
  />
)}
                </>
              ) : (
                <>
                  <div className="container">
                    <Login handleLogin={handleLogin} />
                  </div>
                  <Button
                    style={{ position: "absolute", top: "15px", right: "20px" }}
                    onClick={() => setIsRegistered(false)}
                  >
                    Register
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <div className="container">
                <Register handleRegister={handleRegister} />
              </div>
              <Button
                style={{ position: "absolute", top: "15px", right: "20px" }}
                onClick={() => setIsRegistered(true)}
              >
                Login
              </Button>
            </>
          )}
        </div>

    </div>
    
  );
};

export default ParentComponent;