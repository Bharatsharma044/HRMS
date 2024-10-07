const express = require('express');
const router = require('./routes'); // Ensure this points to your main routes file
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/api', router);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HRMS', {
    serverSelectionTimeoutMS: 30000, // Set a higher timeout value (e.g., 30 seconds) 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Start server
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});


