import React, { useEffect, useState } from 'react';
import { fetchWeatherSummary } from '../services/weatherService';
import WeatherCard from './WeatherCard';
import Charts from './Charts';
import AlertNotification from './AlertNotification';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherSummary();
      setWeatherData(data);
      setFilteredData(data); // Initialize filtered data
      setLoading(false);

      const alertCity = data.find((weather) => weather.temperature > 35);
      if (alertCity) {
        setAlertMessage(`High temperature alert: ${alertCity.city} is ${alertCity.temperature}°C`);
      }
    };

    getWeather();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter weather data based on search term
    const filtered = weatherData.filter((weather) =>
      weather.city.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Real-Time Weather Dashboard</h1>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-4 p-2 border border-gray-300 rounded"
        />
      </header>

      {/* Alert Notification Component */}
      <AlertNotification alertMessage={alertMessage} onDismiss={() => setAlertMessage('')} />

      {loading ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500">Loading weather data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Weather Cards */}
          {filteredData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
      )}

      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Temperature Trends</h2>
        <Charts weatherData={weatherData} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
