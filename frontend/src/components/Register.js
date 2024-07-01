import React from 'react';
import './Register.css';

const RegisterForm = () => {
  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <input className="input" type="text" placeholder="Username" />
      <input className="input" type="email" placeholder="Email" />
      <input className="input" type="password" placeholder="Password" />
      <input className="input" type="text" placeholder="Phone Number" />
      <input className="input" type="text" placeholder="Address" />
      <select className="select">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select className="select">
        <option value="user">User</option>
      </select>
      <button className="button">Register</button>
    </div>
  );
};

export default RegisterForm;
