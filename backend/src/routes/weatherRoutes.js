const express = require('express');
const { getWeatherSummary } = require('../controllers/weatherController');
const router = express.Router();

// Route to get daily weather summary
// Example: GET /api/weather/summary
router.get('/summary', getWeatherSummary);

module.exports = router;
