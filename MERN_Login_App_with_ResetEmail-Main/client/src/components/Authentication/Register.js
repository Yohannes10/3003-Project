
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../Authentication/assets/profile.png'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import convertToBase64 from '../Authentication/helper/convert';
import styles from '../styles/Username.module.css'

const Register = ({handleRegister}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, password);
    setUsername("");
    setPassword("");
  };


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      empID: '',
      role: '',
      password: ''
    },

    onSubmit: async values => {
      // Assign the profile image file (if any) to the form values
      values = await Object.assign(values, { profile: file || '' });
    }
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    // Convert the selected file to base64 format
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', height:'100%' }}>
          <div className="title flex flex-col items-center">
            {/* Render the title and description */}
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-8" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-1">
              {/* Render the profile image */}
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-2">
              {/* Render the form inputs */}
              <input
                className={styles.textbox}
                type="text"
                placeholder="username*"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="password*"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Company*"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="EMPID"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Position/Role*"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              {/* Render the login link */}
              <span className="text-gray-500">
                Already Register?{' '}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
