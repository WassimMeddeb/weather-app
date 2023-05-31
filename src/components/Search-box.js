import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search-box.css';

const api = {
  key: '1ca8f94fd5a462337cfd97e2e6acdbd0',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchWeather = async () => {
    if (query.trim() === '') {
      return;
    }

    try {
      const response = await axios.get(`${api.base}weather?q=${query}&appid=${api.key}`);
      setWeather(response.data);
      setQuery('');
      setError(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError('City not found. Please enter a valid city name.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('Error: No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error: ' + error.message);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  };

  useEffect(() => {
    searchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formatTemperature = (temperature) => {
    return `${Math.round((temperature - 273.15).toFixed(2))}°C`;
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      {error && <div class="alert alert-danger" role="alert">{error}</div>}

      {weather && (
        <div className='weather'>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {formatTemperature(weather.main.temp)}</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};



export default SearchBox;
