import { motion } from 'framer-motion';
import { FaWind, FaCloudRain, FaCompass, FaWater, FaSun, FaMoon } from 'react-icons/fa';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    sys: { country, sunrise, sunset },
  } = weatherData;

  // Function to map OpenWeather icon codes to more attractive icon codes
  const getEnhancedIconCode = (iconCode) => {
    // Map OpenWeather icon codes to weatherbit codes (which look better)
    const iconMap = {
      '01d': 'c01d', // clear sky day
      '01n': 'c01n', // clear sky night
      '02d': 'c02d', // few clouds day
      '02n': 'c02n', // few clouds night
      '03d': 'c03d', // scattered clouds day
      '03n': 'c03n', // scattered clouds night
      '04d': 'c04d', // broken clouds day
      '04n': 'c04n', // broken clouds night
      '09d': 't04d', // shower rain day
      '09n': 't04n', // shower rain night
      '10d': 'r01d', // rain day
      '10n': 'r01n', // rain night
      '11d': 't05d', // thunderstorm day
      '11n': 't05n', // thunderstorm night
      '13d': 's01d', // snow day
      '13n': 's01n', // snow night
      '50d': 'a05d', // mist day
      '50n': 'a05n', // mist night
    };
    
    return iconMap[iconCode] || 'c01d'; // Default to clear day if mapping not found
  };

  // Enhanced weather icon from a better-looking source
  const weatherIcon = `https://weatherbit.io/static/img/icons/${getEnhancedIconCode(weather[0].icon)}.png`;
  
  const weatherDescription = weather[0].description;
  const formattedSunrise = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedSunset = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      className="weather-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="weather-display-header">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="city-name"
        >
          {name}, <span className="country-info">{country} <img src={`https://flagsapi.com/${country}/flat/64.png`} alt={country} className="country-flag" /></span>
        </motion.h2>
        <motion.div 
          className="weather-icon-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img src={weatherIcon} alt={weatherDescription} className="weather-icon" />
          <p className="weather-description">{weatherDescription}</p>
        </motion.div>
      </div>

      <div className="weather-display-body">
        <motion.div 
          className="temperature-container"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="main-temperature">
            <span className="temperature-value">{Math.round(temp)}</span>
            <span className="temperature-unit">°C</span>
          </div>
          <div className="feels-like">
            Feels like: {Math.round(feels_like)}°C
          </div>
        </motion.div>

        <motion.div 
          className="weather-details-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="weather-detail-grid">
            <div className="weather-detail">
              <FaWind className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{Math.round(wind.speed * 3.6)} km/h</span>
                <span className="detail-label">Wind</span>
              </div>
            </div>
            
            <div className="weather-detail">
              <FaWater className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{humidity}%</span>
                <span className="detail-label">Humidity</span>
              </div>
            </div>
            
            <div className="weather-detail">
              <FaCloudRain className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{pressure} hPa</span>
                <span className="detail-label">Pressure</span>
              </div>
            </div>
            
            <div className="weather-detail">
              <FaCompass className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{wind.deg}°</span>
                <span className="detail-label">Wind Direction</span>
              </div>
            </div>

            <div className="weather-detail">
              <FaSun className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{formattedSunrise}</span>
                <span className="detail-label">Sunrise</span>
              </div>
            </div>

            <div className="weather-detail">
              <FaMoon className="detail-icon" />
              <div className="detail-info">
                <span className="detail-value">{formattedSunset}</span>
                <span className="detail-label">Sunset</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay; 