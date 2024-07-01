import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Mail, Delete, Star, Inbox, AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/complaints/admin')
      .then((res) => res.json())
      .then((data) => setComplaints(data));

    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch('/api/feedbacks/admin')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className="header-title">
            <Avatar>U</Avatar>
            <Typography variant="h6">
              Admin Dashboard
            </Typography>
          </div>
          <div className="signout-button">
            <IconButton color="inherit" onClick={handleSignOut}>
              <LogoutIcon />
              <Typography variant="button" color="inherit">Sign Out (Admin)</Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      <div className="sidebar">
        <div className="logo-container">
          <img src="images/logo.png" alt="Logo" />
          <Typography variant="subtitle1">Sistem Layanan Rukun Tetangga Terpadu</Typography>
        </div>
        <Link to="/admin"><Inbox /> Dashboard</Link>
        <Link to="/admin/users"><AccountCircle /> User</Link>
        <Link to="/admin/inbox"><Mail /> Inbox</Link>
        <Link to="/admin/trash"><Delete /> Trash</Link>
        <Link to="/admin/star"><Star /> Star</Link>
        <Link to="/admin/user-experience"><Mail /> User Experience</Link>
      </div>
      
      <div className="main-content">
        <div className="infoContainer">
          <div className="infoBox blue">
            <Mail className="MuiSvgIcon-root" />
            <h6>Total Pesan Masuk</h6>
            <h4>{complaints.length}</h4>
          </div>
          <div className="infoBox red">
            <Mail className="MuiSvgIcon-root" />
            <h6>Belum Terbaca</h6>
            <h4>{complaints.filter(complaint => complaint.status === 'unread').length}</h4>
          </div>
          <div className="infoBox green">
            <Mail className="MuiSvgIcon-root" />
            <h6>Sudah Dibaca</h6>
            <h4>{complaints.filter(complaint => complaint.status === 'read').length}</h4>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Username</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Pesan</th>
              <th>Action</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td>{complaint.created_at}</td>
                <td>{complaint.username}</td>
                <td>{complaint.name}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
                <td><button className="btn btn-primary">View</button></td>
                <td className="action-buttons">
                  <Delete className="MuiSvgIcon-root" />
                  <Star className="MuiSvgIcon-root" />
                </td>
                <td className="action-buttons">
                  <Delete className="MuiSvgIcon-root" />
                  <Star className="MuiSvgIcon-root" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>User Data</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.address}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Feedback</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Username</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.created_at}</td>
                <td>{feedback.username}</td>
                <td>{feedback.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
