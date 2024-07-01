const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // URL dari frontend Anda
  credentials: true
}));



app.use('/auth', authRoutes);
app.use('/complaints', complaintRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
