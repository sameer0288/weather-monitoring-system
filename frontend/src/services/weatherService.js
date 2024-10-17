import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://weather-monitoring-system-ten.vercel.app/api/weather';

export const fetchWeatherSummary = async () => {
  const response = await axios.get(`${API_URL}/summary`);
  return response.data;
};
