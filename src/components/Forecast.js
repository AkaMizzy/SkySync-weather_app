import { motion } from 'framer-motion';
import '../styles/Forecast.css';

const Forecast = ({ forecastData }) => {
  if (!forecastData) return null;

  // Function to map OpenWeather icon codes to weatherbit codes (same as WeatherDisplay)
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

  // Group forecast by day and filter for noon time
  const groupedForecast = [];
  const today = new Date().toLocaleDateString();
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    
    // Skip today's forecast, we only want the next 5 days
    if (day !== today) {
      // Check if we already have this day in our array
      const existingDay = groupedForecast.find(d => d.day === day);
      
      if (!existingDay) {
        // If not, add it
        groupedForecast.push({
          day,
          date,
          temp: item.main.temp,
          weather: item.weather[0],
          // Use the same icon source as WeatherDisplay
          icon: `https://weatherbit.io/static/img/icons/${getEnhancedIconCode(item.weather[0].icon)}.png`
        });
      }
    }
  });

  // Limit to 5 days
  const fiveDayForecast = groupedForecast.slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div 
      className="forecast-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <h3 className="forecast-title">5-Day Forecast</h3>
      <motion.div 
        className="forecast-cards"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {fiveDayForecast.map((day, index) => (
          <motion.div 
            className="forecast-card" 
            key={index}
            variants={item}
          >
            <h4 className="forecast-day">{getDayName(day.date)}</h4>
            <div className="forecast-date">
              {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <img src={day.icon} alt={day.weather.description} className="forecast-icon" />
            <div className="forecast-temp">{Math.round(day.temp)}°C</div>
            <div className="forecast-description">{day.weather.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Forecast; 