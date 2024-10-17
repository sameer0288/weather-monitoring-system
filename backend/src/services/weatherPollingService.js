const { fetchWeatherData } = require('../services/weatherService');
const { sendAlert } = require('../utils/alertService');
const Weather = require('../models/Weather');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Default interval set to 5 minutes (300,000 milliseconds)
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 300000; 

// Function to process weather data for each city
const processWeatherData = async () => {
  console.log('Fetching weather data for cities:', cities);

  for (const city of cities) {
    try {
      const weatherData = await fetchWeatherData(city);

      // Check if the weather data for the city and the current date already exists
      const existingWeatherRecord = await Weather.findOne({
        city: weatherData.city,
        date: {
          $gte: new Date().setHours(0, 0, 0, 0), // Start of the day
          $lt: new Date().setHours(23, 59, 59, 999), // End of the day
        },
      });

      if (!existingWeatherRecord) {
        const weatherRecord = new Weather({
          city: weatherData.city,
          date: new Date(),
          temperature: weatherData.temperature,
          feels_like: weatherData.feels_like,
          condition: weatherData.condition,
        });

        await weatherRecord.save(); // Save only if it doesn't exist for the current day
        console.log(`Weather data saved for ${weatherData.city}`);
      }

      // Check for alerts (Example: Temperature exceeding 35°C)
      if (weatherData.temperature > 35) {
        await sendAlert(`High temperature alert: ${weatherData.city} is ${weatherData.temperature}°C`);
      }

    } catch (error) {
      console.error(`Error fetching or processing data for ${city}: `, error.message);
    }
  }
};

// Function to start the weather polling service
const startWeatherPolling = () => {
  console.log(`Starting weather polling service with an interval of ${POLLING_INTERVAL / 1000 / 60} minutes...`);
  
  // Execute the weather data fetch immediately, then start the interval polling
  processWeatherData();

  // Set interval to fetch weather data continuously
  setInterval(processWeatherData, POLLING_INTERVAL);
};

module.exports = { startWeatherPolling };
