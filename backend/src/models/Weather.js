const mongoose = require('mongoose');

// Updated weather schema
const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Automatically store the date of the weather data
  },
  temperature: {
    type: Number,
    required: true, // Temperature in Celsius
  },
  feels_like: {
    type: Number, // Feels-like temperature in Celsius
  },
  condition: {
    type: String, // Main weather condition (e.g., Rain, Clear, etc.)
    required: true,
  },
  maxTemp: {
    type: Number, // Maximum temperature recorded for the day
  },
  minTemp: {
    type: Number, // Minimum temperature recorded for the day
  },
  dominantCondition: {
    type: String, // Dominant weather condition for rollups
  },
  alertThresholdsBreached: {
    type: Boolean, // To store whether any alerts were triggered
    default: false,
  },
  alerts: [
    {
      type: String, // List of alert messages (e.g., 'Temperature exceeded 35°C')
    }
  ],
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Creating model
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
