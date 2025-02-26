import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import CurrentWeather from "@/components/CurrentWeather";
import { getWeatherInfo } from "@/services/weatherService";

// Mock the icons
jest.mock("react-icons/fa", () => ({
  FaTemperatureHigh: () => <div data-testid="temp-icon" />,
  FaTint: () => <div data-testid="humidity-icon" />,
  FaWind: () => <div data-testid="wind-icon" />,
}));

jest.mock("react-icons/wi", () => ({
  WiDaySunny: () => <div data-testid="sunny-icon" />,
  WiCloudy: () => <div data-testid="cloudy-icon" />,
  WiRain: () => <div data-testid="rain-icon" />,
  WiSnow: () => <div data-testid="snow-icon" />,
  WiFog: () => <div data-testid="fog-icon" />,
  WiThunderstorm: () => <div data-testid="thunderstorm-icon" />,
}));

// Mock getWeatherInfo
jest.mock("@/services/weatherService", () => ({
  getWeatherInfo: jest.fn(),
}));

describe("CurrentWeather Component", () => {
  const mockCity = {
    id: 1,
    name: "London",
    latitude: 51.50853,
    longitude: -0.12574,
    elevation: 25,
    feature_code: "PPLC",
    country_code: "GB",
    admin1_id: 6269131,
    admin2_id: 2648110,
    timezone: "Europe/London",
    population: 7556900,
    country_id: 2635167,
    country: "United Kingdom",
    admin1: "England",
    admin2: "Greater London",
    postcodes: [],
  };

  const mockWeatherData = {
    latitude: 51.5,
    longitude: -0.120000124,
    generationtime_ms: 0.0883340835571289,
    utc_offset_seconds: 0,
    timezone: "Europe/London",
    timezone_abbreviation: "GMT",
    elevation: 23,
    current_units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      weather_code: "wmo code",
      wind_speed_10m: "km/h",
    },
    current: {
      time: "2025-02-26T13:00",
      interval: 900,
      temperature_2m: 8.8,
      relative_humidity_2m: 77,
      weather_code: 66,
      wind_speed_10m: 12.7,
    },
    daily_units: {
      time: "iso8601",
      weather_code: "wmo code",
      temperature_2m_max: "°C",
      temperature_2m_min: "°C",
    },
    daily: {
      time: [
        "2025-02-26",
        "2025-02-27",
        "2025-02-28",
        "2025-03-01",
        "2025-03-02",
        "2025-03-03",
        "2025-03-04",
      ],
      weather_code: [80, 3, 2, 45, 3, 45, 3],
      temperature_2m_max: [11, 9.6, 9.2, 8.4, 8.8, 10.7, 13.9],
      temperature_2m_min: [4, 4.8, 1.8, 0.1, 1.2, 0.6, 5.3],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getWeatherInfo as jest.Mock).mockReturnValue({
      condition: "Rain",
      icon: "rain",
    });
  });

  test("renders city name and country", () => {
    render(
      <CurrentWeather
        weatherData={mockWeatherData}
        city={mockCity}
        unit="celsius"
      />
    );
    expect(screen.getByText("London, United Kingdom")).toBeInTheDocument();
  });

  test("renders temperature in celsius", () => {
    render(
      <CurrentWeather
        weatherData={mockWeatherData}
        city={mockCity}
        unit="celsius"
      />
    );

    const tempElements = screen.getAllByText("9°C");
    expect(tempElements.length).toBeGreaterThan(0); // Ensure at least one exists
    expect(tempElements[0]).toBeInTheDocument();
  });

  test("renders temperature in fahrenheit when unit is fahrenheit", () => {
    render(
      <CurrentWeather
        weatherData={mockWeatherData}
        city={mockCity}
        unit="fahrenheit"
      />
    );

    const tempElements = screen.getAllByText("48°F");
    expect(tempElements.length).toBeGreaterThan(0);
    expect(tempElements[0]).toBeInTheDocument();
  });

  test("renders weather details - wind and humidity", () => {
    render(
      <CurrentWeather
        weatherData={mockWeatherData}
        city={mockCity}
        unit="celsius"
      />
    );

    expect(
      screen.getByText((content) => content.includes("12.7 km/h"))
    ).toBeInTheDocument();
    expect(screen.getByText(/77%/i)).toBeInTheDocument();
  });

  test("renders different weather icon for cloudy weather", () => {
    (getWeatherInfo as jest.Mock).mockReturnValue({
      condition: "Overcast",
      icon: "cloudy",
    });

    const cloudyWeatherData = {
      ...mockWeatherData,
      current: {
        ...mockWeatherData.current,
        weather_code: 3,
      },
    };

    render(
      <CurrentWeather
        weatherData={cloudyWeatherData}
        city={mockCity}
        unit="celsius"
      />
    );

    expect(screen.getByTestId("cloudy-icon")).toBeInTheDocument();
  });
});
