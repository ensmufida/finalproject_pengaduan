import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: localStorage.getItem('username'),
      message
    };

    try {
      await axios.post('/api/feedback/submit', data);
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit Feedback
      </Typography>
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default FeedbackForm;
