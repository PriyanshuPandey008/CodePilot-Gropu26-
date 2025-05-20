require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const aiRoutes = require('./src/routes/ai.routes');
const authRoutes = require('./src/routes/auth.routes');
const commentRoutes = require('./src/routes/comment.routes');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json());

//  AI routes

app.use('/ai', aiRoutes);

// Auth routes

app.use('/api', authRoutes);

// Comment routes

app.use('/api/comments', commentRoutes);


// MongoDB connection with environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});