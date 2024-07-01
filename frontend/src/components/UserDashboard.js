import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Mail, Delete, Star, Inbox } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import './UserDashboard.css';

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    // Fetch complaints data for the logged-in user
    fetch(`/api/complaints/user?username=${username}`)
      .then((res) => res.json())
      .then((data) => setComplaints(data));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleSubmitFeedback = () => {
    const username = localStorage.getItem('username');
    fetch('/api/feedbacks/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, message: feedbackMessage })
    })
      .then((res) => res.json())
      .then(() => {
        setFeedbackMessage('');
        fetch(`/api/feedbacks/user?username=${username}`)
          .then((res) => res.json())
          .then((data) => setFeedbackMessage(data));
      });
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className="header-title">
            <Avatar>U</Avatar>
            <Typography variant="h6">
              User Dashboard
            </Typography>
          </div>
          <div className="signout-button">
            <IconButton color="inherit" onClick={handleSignOut}>
              <LogoutIcon />
              <Typography variant="button" color="inherit">Sign Out (User)</Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      <div className="sidebar">
        <div className="logo-container">
          <img src="images/logo.png" alt="Logo" />
          <Typography variant="subtitle1">Sistem Layanan Rukun Tetangga Terpadu</Typography>
        </div>
        <Link to="/user"><Inbox /> Dashboard</Link>
        <Link to="/user/complaints"><Mail /> Complaint</Link>
        <Link to="/user/inbox"><Mail /> Inbox</Link>
        <Link to="/user/trash"><Delete /> Trash</Link>
        <Link to="/user/star"><Star /> Star</Link>
        <Link to="/user/feedback"><Mail /> Kritik</Link>
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
      </div>
    </div>
  );
};

export default UserDashboard;
