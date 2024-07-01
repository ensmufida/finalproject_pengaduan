import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      onLogin(response.data.token, response.data.role);
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed: ' + (error.response ? error.response.data : 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src="/images/telaga.jpg" alt="Login" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img src="/images/logo2.png" alt="Logo" />
          </div>
          <h2>Welcome to MyRT</h2>
          <p>Sistem Layanan Rukun Tetangga Terpadu</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-remember">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button onClick={handleLogin}>LOGIN</button>
          {error && <p className="error-message">{error}</p>}
          <p className="login-footer">
            Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
          </p>
          <p className="login-terms">
            copyright @ensm2024 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
