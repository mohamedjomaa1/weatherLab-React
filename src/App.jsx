import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import LocationButton from "./components/LocationButton";
import weatherService from './services/weatherService'; // Import the default export
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial load with default city
  useEffect(() => {
    handleSearch('Tunis');
  }, []);

  const handleSearch = async (city) => {
    setIsLoading(true);
    setError('');

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getWeather(city), // Use weatherService methods
        weatherService.getForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Error retrieving data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationWeather = async (lat, lon) => {
    setIsLoading(true);

    try {
      const weatherData = await weatherService.getWeatherByCoords(lat, lon); // Use weatherService methods
      const forecastData = await weatherService.getForecast(weatherData.name);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Geolocation error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <h1 className="text-center mb-4">🌤 Real Time Weather</h1>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <LocationButton onLocationFound={handleLocationWeather} isLoading={isLoading} />

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {isLoading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {weather && <WeatherDisplay data={weather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </Container>
  );
}

export default App;
