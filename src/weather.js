import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response1 = await axios.get(API_URL, {
          params: {
            q: 'New York',
            units: 'imperial',
            appid: API_KEY,
          },
        });
        const response2 = await axios.get(API_URL, {
          params: {
            q: 'Mumbai',
            units: 'imperial',
            appid: API_KEY,
          },
        });

        setWeatherData({
          newYorkData: response1.data,
          mumbaiData: response2.data,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
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
      <p>Temperature: {weatherData.newYorkData.main.temp}°F</p>
      <p>Feels Like: {weatherData.newYorkData.main.feels_like}°F</p>
      <p>Humidity: {weatherData.newYorkData.main.humidity}%</p>
      <p>Description: {weatherData.newYorkData.weather[0].description}</p>
      <h2>Current Weather in Mumbai</h2>
      <p>Temperature: {weatherData.mumbaiData.main.temp}°F</p>
      <p>Feels Like: {weatherData.mumbaiData.main.feels_like}°F</p>
      <p>Humidity: {weatherData.mumbaiData.main.humidity}%</p>
      <p>Description: {weatherData.mumbaiData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
