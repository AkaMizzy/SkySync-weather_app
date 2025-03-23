import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/WeatherAnimation.css';

const WeatherAnimation = ({ weatherCondition }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      let count = 0;
      
      switch (weatherCondition) {
        case 'rainy':
          count = 50;
          for (let i = 0; i < count; i++) {
            newElements.push({
              id: `rain-${i}`,
              type: 'rain',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            });
          }
          break;
          
        case 'snowy':
          count = 40;
          for (let i = 0; i < count; i++) {
            newElements.push({
              id: `snow-${i}`,
              type: 'snow',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
              size: `${Math.random() * 10 + 5}px`
            });
          }
          break;
          
        case 'cloudy':
          count = 6;
          for (let i = 0; i < count; i++) {
            newElements.push({
              id: `cloud-${i}`,
              type: 'cloud',
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 40}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 30}s`,
              scale: 0.5 + Math.random() * 0.5
            });
          }
          break;
          
        case 'clear':
          newElements.push({
            id: 'sun',
            type: 'sun'
          });
          break;
          
        case 'stormy':
          count = 30;
          for (let i = 0; i < count; i++) {
            newElements.push({
              id: `rain-${i}`,
              type: 'rain',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            });
          }
          
          for (let i = 0; i < 5; i++) {
            newElements.push({
              id: `lightning-${i}`,
              type: 'lightning',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: '0.5s'
            });
          }
          break;
          
        case 'foggy':
          for (let i = 0; i < 5; i++) {
            newElements.push({
              id: `fog-${i}`,
              type: 'fog',
              left: `${i * 20}%`,
              top: `${Math.random() * 40}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${30 + Math.random() * 20}s`
            });
          }
          break;
          
        default:
          break;
      }
      
      setElements(newElements);
    };
    
    generateElements();
  }, [weatherCondition]);

  const renderElement = (element) => {
    switch (element.type) {
      case 'rain':
        return (
          <motion.div
            key={element.id}
            className="rain-drop"
            style={{
              left: element.left,
              animationDelay: element.animationDelay,
              animationDuration: element.animationDuration
            }}
            initial={{ top: '-5%' }}
            animate={{ top: '105%' }}
            transition={{
              duration: parseFloat(element.animationDuration),
              delay: parseFloat(element.animationDelay),
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
        
      case 'snow':
        return (
          <motion.div
            key={element.id}
            className="snow-flake"
            style={{
              left: element.left,
              width: element.size,
              height: element.size,
              animationDelay: element.animationDelay
            }}
            initial={{ top: '-5%', rotate: 0 }}
            animate={{ 
              top: '105%', 
              rotate: 360,
              x: [0, 20, -20, 10, -10, 0]
            }}
            transition={{
              duration: parseFloat(element.animationDuration),
              delay: parseFloat(element.animationDelay),
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
        
      case 'cloud':
        return (
          <motion.div
            key={element.id}
            className="cloud"
            style={{
              left: element.left,
              top: element.top,
              opacity: element.opacity,
              scale: element.scale
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: parseFloat(element.animationDuration),
              delay: parseFloat(element.animationDelay),
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
        
      case 'sun':
        return (
          <motion.div
            key={element.id}
            className="sun"
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        );
        
      case 'lightning':
        return (
          <motion.div
            key={element.id}
            className="lightning"
            style={{
              left: element.left,
              top: element.top
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 0] }}
            transition={{
              duration: 0.5,
              delay: parseFloat(element.animationDelay),
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 5,
              ease: 'easeOut'
            }}
          />
        );
        
      case 'fog':
        return (
          <motion.div
            key={element.id}
            className="fog"
            style={{
              left: element.left,
              top: element.top,
              opacity: element.opacity
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: parseFloat(element.animationDuration),
              delay: parseFloat(element.animationDelay),
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="weather-animation">
      {elements.map(renderElement)}
    </div>
  );
};

export default WeatherAnimation; 