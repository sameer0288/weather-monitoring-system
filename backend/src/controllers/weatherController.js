const Weather = require('../models/Weather');
const { fetchWeatherData } = require('../services/weatherService');
const { sendAlert } = require('../utils/alertService');

const getWeatherSummary = async (req, res) => {
  try {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const alertThreshold = req.query.alertThreshold || 35; // Allow user-configurable alert threshold
    const weatherSummaries = [];

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    for (const city of cities) {
      const weatherData = await fetchWeatherData(city);

      // Check if the weather data for the city and the current date already exists
      const existingWeatherRecord = await Weather.findOne({
        city: weatherData.city,
        date: { $gte: startOfDay, $lt: endOfDay }, // Check for the same day record
      });

      if (!existingWeatherRecord) {
        const weatherRecord = new Weather({
          city: weatherData.city,
          date: new Date(),
          temperature: weatherData.temperature,
          feels_like: weatherData.feels_like,
          condition: weatherData.condition,
        });

        await weatherRecord.save(); // Save only if it doesn't already exist
      }

      // Check for alerts
      if (weatherData.temperature > alertThreshold) {
        sendAlert(`High temperature alert: ${weatherData.city} is ${weatherData.temperature}°C`);
      }

      weatherSummaries.push(weatherData);
    }

    res.status(200).json(weatherSummaries);
  } catch (error) {
    console.error('Error retrieving weather summaries:', error.message);
    res.status(500).json({ message: 'Failed to retrieve weather summaries' });
  }
};

module.exports = { getWeatherSummary };
