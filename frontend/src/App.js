// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ComplaintForm from './components/ComplaintForm';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [role, setRole] = React.useState(localStorage.getItem('role'));

  const handleLogin = (token, role) => {
    setToken(token);
    setRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user/complaints" element={<ComplaintForm />} />
        <Route path="/user/feedback" element={<FeedbackForm />} />
        <Route path="/admin/inbox" element={<AdminDashboard />} />
        <Route path="/admin/trash" element={<AdminDashboard />} />
        <Route path="/admin/star" element={<AdminDashboard />} />
        <Route path="/admin/user-experience" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
