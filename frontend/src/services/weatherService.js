import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/weather';

export const fetchWeatherSummary = async () => {
  const response = await axios.get(`${API_URL}/summary`);
  return response.data;
};
