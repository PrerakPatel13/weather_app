import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '386e1c0bcb9f1a3a8088aba8de97b3c9';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL, {
          params: {
            q: 'New York',
            units: 'imperial',
            appid: API_KEY,
          },
        });

        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Current Weather in New York</h2>
      <p>Temperature: {weatherData.main.temp}°F</p>
      <p>Feels Like: {weatherData.main.feels_like}°F</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
