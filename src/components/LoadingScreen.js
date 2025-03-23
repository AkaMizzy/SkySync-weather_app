import { motion } from 'framer-motion';
import { FaSun, FaCloudRain, FaSnowflake, FaCloud } from 'react-icons/fa';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <motion.div 
        className="loading-animation"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <FaSun className="loading-icon sun" />
        <FaCloudRain className="loading-icon rain" />
        <FaSnowflake className="loading-icon snow" />
        <FaCloud className="loading-icon cloud" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        Fetching weather data...
      </motion.p>
    </div>
  );
};

export default LoadingScreen; 