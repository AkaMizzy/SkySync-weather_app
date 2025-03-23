import { motion } from 'framer-motion';
import '../styles/Forecast.css';

const Forecast = ({ forecastData }) => {
  if (!forecastData) return null;

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
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
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