/* 
  This is an array of objects representing the data for the sidebar menu items.
  Each object contains the title, path, icon, and cName (class name) for a menu item.
  The icons are imported from react-icons, and the cName is used for styling purposes.
*/

// Import necessary icons
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

// Define the array of sidebar data
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />, // Home icon
    cName: 'nav-text' // CSS class name for styling
  },
  {
    title: 'Show Task',
    path: '/ShowTask',
    icon: <IoIcons.IoIosPaper />, // Paper icon
    cName: 'nav-text' // CSS class name for styling
  },
  {
    title: 'Add Task',
    path: '/Addtask',
    icon: <FaIcons.FaCartPlus />, // Cart plus icon
    cName: 'nav-text' // CSS class name for styling
  },
  {
    title: 'Performance Summary',
    path: '/RatingSummary',
    icon: <IoIcons.IoMdPeople />, // People icon
    cName: 'nav-text' // CSS class name for styling
  },
  {
    title: 'Help',
    path: '/help',
    icon: <IoIcons.IoMdPeople />, // People icon
    cName: 'nav-text' // CSS class name for styling
  },
  {
    title: 'Log Out',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />, // Envelope open text icon
    cName: 'nav-text' // CSS class name for styling
  },
];
