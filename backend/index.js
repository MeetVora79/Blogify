require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require("./routes/auth");

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
// Parse JSON bodies  
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log('Connected to MongoDB');
}).catch((err) => {
	console.error('Error connecting to MongoDB:', err.message);
});

const PORT = process.env.PORT || 5000;

// Define routes
app.use('/api/blogs', blogRoutes);
app.use("/api/auth", authRoutes);
app.use('/', (req, res) => {
	res.send('Welcome to the Blogify API');	
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});