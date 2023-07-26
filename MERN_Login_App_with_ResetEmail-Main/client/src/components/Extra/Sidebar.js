/* 
  This is a React functional component that represents a sidebar navigation menu.
  It provides a toggle button to show or hide the sidebar menu and renders the menu items based on the provided data.
  It uses react-icons for displaying icons and react-router-dom for navigation.
*/

// Import necessary modules and icons
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { SidebarData } from "./SidebarData"; // Import the data for the sidebar menu items

// Define the Sidebar component using arrow function syntax
const Sidebar = () => {
  // State variable to manage the visibility of the sidebar
  const [sidebar, setSidebar] = useState(false);

  // Function to toggle the visibility of the sidebar
  const showSidebar = () => setSidebar(!sidebar);

  // State variable to manage the active aspect (current selection) in the sidebar
  const [activeAspect, setActiveAspect] = useState("");

  return (
    <div>
      {/* Provide the context for icon styling */}
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {/* Toggle button for showing or hiding the sidebar */}
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        {/* Render the sidebar navigation */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* Close button */}
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {/* Render the menu items */}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {/* Link to the specified path */}
                  <Link to={item.path}>
                    {/* Render the icon */}
                    {item.icon}
                    {/* Render the title */}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

// Export the Sidebar component
export default Sidebar;
