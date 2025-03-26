import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowResults(false);
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

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim().length >= 3) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=e1895434a7b06937c4edea98fe5353ce`
        );
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = (cityName) => {
    setCity(cityName);
    onSearch(cityName);
    setShowResults(false);
  };

  return (
    <motion.div 
      className="search-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={searchRef}
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
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

      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div 
              key={index}
              className="search-results-item"
              onClick={() => handleResultClick(result.name)}
            >
              {result.name}{result.state ? `, ${result.state}` : ''}{result.country ? `, ${result.country}` : ''}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar; 