import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register scales and elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ data = { labels: [], values: [] } }) => {
  // Prepare chart data
  const chartData = {
    labels: data.labels.length ? data.labels : ['No Data'], // Use a default label if none provided
    datasets: [
      {
        label: 'Average Temperature (°C)', // Added unit to label
        data: data.values.length ? data.values : [0], // Use a default value if none provided
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Slightly more opaque for visibility
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true, // Fill under the bars
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trends', // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cities', // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)', // Y-axis label
        },
        beginAtZero: true, // Start the y-axis at 0
      },
    },
  };

  // Don't render the chart if no data is available
  if (!data.labels.length || !data.values.length) {
    return <div className="text-center text-lg text-gray-500">No data available to display.</div>;
  }

  return (
    <div style={{ position: 'relative', height: '40vh', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Charts;
