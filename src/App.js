import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import LoadingScreen from './components/LoadingScreen';
import WeatherAnimation from './components/WeatherAnimation';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('Casablanca');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = 'e1895434a7b06937c4edea98fe5353ce';
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch current weather
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        // Fetch 5-day forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
      } catch (err) {
        setError('City not found. Please try another location.');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [city, API_KEY]);
  
  const handleCitySearch = (searchCity) => {
    setCity(searchCity);
  };
  
  const getWeatherCondition = () => {
    if (!weatherData) return 'clear';
    
    const condition = weatherData.weather[0].main.toLowerCase();
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('snow')) return 'snowy';
    if (condition.includes('thunder')) return 'stormy';
    if (condition.includes('fog') || condition.includes('mist')) return 'foggy';
    return 'clear';
  };
  
  return (
    <div className={`App weather-${getWeatherCondition()}`}>
      <WeatherAnimation weatherCondition={getWeatherCondition()} />
      
      <motion.div 
        className="weather-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SearchBar onSearch={handleCitySearch} />
        
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <WeatherDisplay weatherData={weatherData} />
            <Forecast forecastData={forecastData} />
          </>
        )}
      </motion.div>
    </div>
  );
}

export default App;
