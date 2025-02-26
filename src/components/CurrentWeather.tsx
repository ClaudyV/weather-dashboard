import { CityDataT, WeatherDataT } from "@/lib/type";
import { FaTemperatureHigh, FaTint, FaWind } from "react-icons/fa";
import {
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import { getWeatherInfo } from "../services/weatherService";

interface CurrentWeatherProps {
  weatherData: WeatherDataT;
  city: CityDataT;
  unit: string;
}

const CurrentWeather = ({ weatherData, city, unit }: CurrentWeatherProps) => {
  if (!weatherData || !weatherData.current) return null;

  const { current } = weatherData;
  const weatherInfo = getWeatherInfo(current.weather_code);

  // Convert temperature if needed
  const temperature =
    unit === "celsius"
      ? current.temperature_2m
      : (current.temperature_2m * 9) / 5 + 32;

  const tempUnit = unit === "celsius" ? "°C" : "°F";

  // Get weather icon based on condition
  const renderIcon = () => {
    switch (weatherInfo.icon) {
      case "sunny":
        return (
          <WiDaySunny className="text-6xl text-weather-sunny text-gray-500" />
        );
      case "partly-cloudy":
      case "cloudy":
        return (
          <WiCloudy className="text-6xl text-weather-cloudy text-gray-500" />
        );
      case "rainy":
        return <WiRain className="text-6xl text-weather-rainy text-gray-500" />;
      case "snowy":
        return <WiSnow className="text-6xl text-weather-snowy text-gray-500" />;
      case "foggy":
        return <WiFog className="text-6xl text-weather-cloudy text-gray-500" />;
      case "thunderstorm":
        return (
          <WiThunderstorm className="text-6xl text-weather-rainy text-gray-500" />
        );
      default:
        return <WiDaySunny className="text-6xl text-weather-sunny" />;
    }
  };

  return (
    <div className="card p-6 md:p-8 animate-fadeIn transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-1 text-gray-500">
            {city.name}, {city.country}
          </h2>
          <p className="text-gray-500 mb-4">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="flex items-center mb-6">
            {renderIcon()}
            <div className="ml-4">
              <div className="text-4xl font-bold text-gray-500">
                {Math.round(temperature)}
                {tempUnit}
              </div>
              <div className="text-lg text-gray-600">
                {weatherInfo.condition}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-lg font-bold mb-3 text-gray-500">Details</h3>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center">
              <FaTemperatureHigh className="text-xl text-primary mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Feels Like</p>
                <p className="font-medium text-gray-500">
                  {Math.round(temperature)}
                  {tempUnit}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaWind className="text-xl text-primary mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="font-medium text-gray-500">
                  {current.wind_speed_10m} km/h
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaTint className="text-xl text-primary mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-medium text-gray-500">
                  {current.relative_humidity_2m}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
