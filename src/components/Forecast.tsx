import {
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import React from "react";
import { WeatherDataDailyT } from "@/lib/type";
import { getWeatherInfo } from "../services/weatherService";

interface ForecastProps {
  forecast: WeatherDataDailyT;
  unit: string;
}

const Forecast = ({ forecast, unit }: ForecastProps) => {
  if (!forecast || !forecast.time) return null;

  // Get a specific weather icon
  const getWeatherIcon = (weatherCode: number) => {
    const weatherInfo = getWeatherInfo(weatherCode);

    switch (weatherInfo.icon) {
      case "sunny":
        return <WiDaySunny className="text-4xl text-weather-sunny" />;
      case "partly-cloudy":
      case "cloudy":
        return <WiCloudy className="text-4xl text-weather-cloudy" />;
      case "rainy":
        return <WiRain className="text-4xl text-weather-rainy" />;
      case "snowy":
        return <WiSnow className="text-4xl text-weather-snowy" />;
      case "foggy":
        return <WiFog className="text-4xl text-weather-cloudy" />;
      case "thunderstorm":
        return <WiThunderstorm className="text-4xl text-weather-rainy" />;
      default:
        return <WiDaySunny className="text-4xl text-weather-sunny" />;
    }
  };

  // Convert temperature based on unit
  const convertTemp = (temp: number) => {
    return unit === "celsius" ? temp : (temp * 9) / 5 + 32;
  };

  const tempUnit = unit === "celsius" ? "°C" : "°F";

  // Only show the next 5 days
  const forecastDays = forecast.time.slice(1, 6);

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-500">5-Day Forecast</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {forecastDays.map((day, index) => {
          const formattedDay = new Date(day).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const weatherCode = forecast.weather_code[index + 1];
          const maxTemp = Math.round(
            convertTemp(forecast.temperature_2m_max[index + 1])
          );
          const minTemp = Math.round(
            convertTemp(forecast.temperature_2m_min[index + 1])
          );

          return (
            <div key={day}>
              <p className="font-bold mb-2 text-gray-500">{formattedDay}</p>
              <div className="my-2 text-gray-500">
                {getWeatherIcon(weatherCode)}
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-500">
                  {maxTemp}
                  {tempUnit}
                </span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-500">
                  {minTemp}
                  {tempUnit}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {getWeatherInfo(weatherCode).condition}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
