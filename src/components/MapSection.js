import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import '../styles/MapSection.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icon with weather conditions
const createWeatherIcon = (temp, condition) => {
  return L.divIcon({
    className: 'custom-weather-marker',
    html: `
      <div class="marker-content">
        <div class="marker-temp">${Math.round(temp)}°C</div>
        <div class="marker-condition">${condition}</div>
      </div>
    `,
    iconSize: [60, 40],
    iconAnchor: [30, 40],
  });
};

// Component to set map view when coordinates change
const SetViewOnChange = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
};

const MapSection = ({ weatherData }) => {
  const [mapCenter, setMapCenter] = useState([31.7917, -7.0926]); // Default to Morocco center
  const [cities, setCities] = useState([]);
  const zoom = 5;

  useEffect(() => {
    // Update map center when weather data changes
    if (weatherData && weatherData.coord) {
      setMapCenter([weatherData.coord.lat, weatherData.coord.lon]);
    }

    // Demo cities with weather data (we'd normally fetch this)
    const demoCities = [
      {
        name: 'Casablanca',
        coords: [33.5731, -7.5898],
        temp: 22,
        condition: 'Clear',
        humidity: 65,
        windSpeed: 12
      },
      {
        name: 'Marrakech',
        coords: [31.6295, -7.9811],
        temp: 28,
        condition: 'Sunny',
        humidity: 35,
        windSpeed: 8
      },
      {
        name: 'Rabat',
        coords: [34.0209, -6.8416],
        temp: 20,
        condition: 'Cloudy',
        humidity: 70,
        windSpeed: 15
      },
      {
        name: 'Fes',
        coords: [34.0181, -5.0078],
        temp: 25,
        condition: 'Partly Cloudy',
        humidity: 50,
        windSpeed: 10
      },
      {
        name: 'Tangier',
        coords: [35.7595, -5.8340],
        temp: 19,
        condition: 'Light Rain',
        humidity: 80,
        windSpeed: 18
      }
    ];

    setCities(demoCities);
  }, [weatherData]);

  return (
    <motion.div
      className="map-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="map-title">Weather Map</h2>
      <div className="map-wrapper">
        <MapContainer 
          center={mapCenter} 
          zoom={zoom} 
          className="leaflet-map"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Weather layer from OpenWeatherMap */}
          <TileLayer
            url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e1895434a7b06937c4edea98fe5353ce"
            opacity={0.6}
          />
          
          {/* City markers */}
          {cities.map(city => (
            <Marker 
              key={city.name}
              position={city.coords}
              icon={createWeatherIcon(city.temp, city.condition)}
            >
              <Popup className="weather-popup">
                <div className="popup-city">{city.name}</div>
                <div className="popup-temp">{Math.round(city.temp)}°C</div>
                <div className="popup-condition">{city.condition}</div>
                <div className="popup-details">
                  <span>Humidity: {city.humidity}%</span>
                  <span>Wind: {city.windSpeed} km/h</span>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <SetViewOnChange coords={mapCenter} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapSection; 