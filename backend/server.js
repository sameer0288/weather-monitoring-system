const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package
const weatherRoutes = require('./src/routes/weatherRoutes');
const { startWeatherPolling } = require('./src/services/weatherPollingService');

dotenv.config();

const app = express();

// Middleware and routes setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/api/weather', weatherRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the weather polling service after DB connection is established
    startWeatherPolling();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
