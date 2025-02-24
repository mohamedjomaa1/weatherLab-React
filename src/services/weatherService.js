import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const weatherService = {
  getWeather: async (city) => {
    try {
      const response = await axios.get(`${API_URL}/weather`, {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
          lang: 'fr',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'City not found');
    }
  },

  getForecast: async (city) => {
    try {
      const response = await axios.get(`${API_URL}/forecast`, {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
          lang: 'fr',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Forecast unavailable');
    }
  },

  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(`${API_URL}/weather`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
          lang: 'fr',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Location not available');
    }
  },
};

export default weatherService;
