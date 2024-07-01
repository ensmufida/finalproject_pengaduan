// frontend/src/components/ComplaintForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const ComplaintForm = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { username } = useContext(UserContext); // Gunakan username dari UserContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('username', username); // Gunakan username dari konteks
        formData.append('category', category);
        formData.append('message', message);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/complaints/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(response.data.message);
        } catch (err) {
            console.error(err);
            setError('Error submitting complaint');
        }
    };

    const handleBack = () => {
        navigate('/user-dashboard');
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <h2>Submit a Complaint</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div style={{ marginBottom: '15px' }}>
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', height: '100px' }}
                    ></textarea>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>Submit</button>
                <button type="button" onClick={handleBack} style={{ padding: '10px 20px', fontSize: '16px' }}>Back to Dashboard</button>
            </form>
        </div>
    );
};

export default ComplaintForm;
