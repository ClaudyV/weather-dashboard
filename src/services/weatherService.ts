import axios from "axios";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const searchCity = async (cityName: string) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        name: cityName,
        count: 1,
        language: "en",
        format: "json",
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Error searching for city:", error);
    throw new Error("Failed to search for city");
  }
};

export const getWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: 7,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

// Helper function to interpret weather code from Open-Meteo
export const getWeatherInfo = (code: number) => {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return { condition: "Clear sky", icon: "sunny" };
  if (code === 1) return { condition: "Mainly clear", icon: "sunny" };
  if (code === 2) return { condition: "Partly cloudy", icon: "partly-cloudy" };
  if (code === 3) return { condition: "Overcast", icon: "cloudy" };
  if (code >= 45 && code <= 48) return { condition: "Fog", icon: "foggy" };
  if (code >= 51 && code <= 55) return { condition: "Drizzle", icon: "rainy" };
  if (code >= 56 && code <= 57)
    return { condition: "Freezing Drizzle", icon: "rainy" };
  if (code >= 61 && code <= 65) return { condition: "Rain", icon: "rainy" };
  if (code >= 66 && code <= 67)
    return { condition: "Freezing Rain", icon: "rainy" };
  if (code >= 71 && code <= 77) return { condition: "Snow", icon: "snowy" };
  if (code >= 80 && code <= 82)
    return { condition: "Rain showers", icon: "rainy" };
  if (code >= 85 && code <= 86)
    return { condition: "Snow showers", icon: "snowy" };
  if (code >= 95 && code <= 99)
    return { condition: "Thunderstorm", icon: "thunderstorm" };

  return { condition: "Unknown", icon: "unknown" };
};
