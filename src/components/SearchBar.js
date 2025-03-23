import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=e1895434a7b06937c4edea98fe5353ce`
            );
            const data = await response.json();
            if (data && data.length > 0) {
              setCity(data[0].name);
              onSearch(data[0].name);
            }
          } catch (error) {
            console.error('Error getting location:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <motion.div 
      className="search-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            aria-label="City name"
          />
          <motion.button
            type="button"
            className="location-button"
            onClick={handleLocationClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLocationArrow />
          </motion.button>
        </div>
        <motion.button
          type="submit"
          className="search-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar; 