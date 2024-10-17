import React, { useState } from 'react';

// Function to get the weather icon URL based on condition
const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Clear':
      return 'https://openweathermap.org/img/wn/01d.png';
    case 'Clouds':
      return 'https://openweathermap.org/img/wn/02d.png';
    case 'Rain':
      return 'https://openweathermap.org/img/wn/10d.png';
    case 'Snow':
      return 'https://openweathermap.org/img/wn/13d.png';
    case 'Thunderstorm':
      return 'https://openweathermap.org/img/wn/11d.png';
    default:
      return 'https://openweathermap.org/img/wn/50d.png'; // Default icon for unclear weather
  }
};

const WeatherCard = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true); // State to toggle between Celsius and Fahrenheit

  // Function to toggle the temperature unit
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  // Function to convert Celsius to Fahrenheit
  const toFahrenheit = (celsius) => (celsius * 9/5) + 32;

  return (
    <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4">
      <h3 className="text-lg font-bold">{weather.city}</h3>
      <img 
        src={getWeatherIcon(weather.condition)} 
        alt={weather.condition} 
        className="w-12 h-12 mb-2" 
      />
      <p className="text-gray-600">
        Temperature: {isCelsius ? `${weather.temperature}°C` : `${toFahrenheit(weather.temperature).toFixed(1)}°F`}
      </p>
      <p className="text-gray-600">
        Feels Like: {isCelsius ? `${weather.feels_like}°C` : `${toFahrenheit(weather.feels_like).toFixed(1)}°F`}
      </p>
      <p className="text-gray-600">Condition: {weather.condition}</p>
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="mt-2 bg-yellow-100 text-yellow-800 p-2 rounded">
          <strong>Alerts:</strong> {weather.alerts.join(', ')}
        </div>
      )}
      <button 
        onClick={toggleTemperature} 
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Toggle to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherCard;
