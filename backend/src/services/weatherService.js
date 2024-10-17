const axios = require('axios');

const fetchWeatherData = async (city, tempUnit = 'C') => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const data = response.data;

    const kelvinTemp = data.main.temp;
    const kelvinFeelsLike = data.main.feels_like;

    // Convert temperature based on the user's preference (Celsius, Fahrenheit, or Kelvin)
    let temperature, feels_like;

    switch (tempUnit) {
      case 'F': // Fahrenheit
        temperature = ((kelvinTemp - 273.15) * 9/5 + 32).toFixed(2);
        feels_like = ((kelvinFeelsLike - 273.15) * 9/5 + 32).toFixed(2);
        break;
      case 'K': // Kelvin (no conversion needed)
        temperature = kelvinTemp.toFixed(2);
        feels_like = kelvinFeelsLike.toFixed(2);
        break;
      case 'C': // Celsius (default)
      default:
        temperature = (kelvinTemp - 273.15).toFixed(2);
        feels_like = (kelvinFeelsLike - 273.15).toFixed(2);
        break;
    }

    return {
      city: data.name,
      temperature,
      feels_like,
      condition: data.weather[0].main,
      timestamp: data.dt,
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error.message);
    throw new Error('Failed to retrieve weather data');
  }
};

module.exports = { fetchWeatherData };
