"use client";

import CurrentWeather from "@/components/CurrentWeather";
import LoadingUi from "@/components/ui/Loading";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import useWeather from "@/hooks/useWeather";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [unit, setUnit] = useState("celsius");

  const { useGetWeatherByCity, useGetWeatherByCoordinates } = useWeather();
  const { data: cityData, isFetching: fetchingCity } =
    useGetWeatherByCity(city);

  const {
    data: weatherData,
    error,
    isFetching: fetchingWeather,
  } = useGetWeatherByCoordinates(cityData?.latitude, cityData?.longitude);

  const isFetching = fetchingCity || fetchingWeather;

  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2 text-gray-500">
            Weather Dashboard
          </h1>
          <p className="text-secondary text-gray-500">
            Check current weather and forecast for any city
          </p>
        </header>

        <SearchBar onSearch={(city: string) => setCity(city)} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
            <p>{error.message}</p>
          </div>
        )}

        {isFetching && !weatherData && (
          <div className="flex justify-center my-10 text-gray-500">
            <LoadingUi />
          </div>
        )}

        {weatherData && cityData && city && (
          <div className="mt-8 grid gap-6">
            <div className="flex justify-end mb-2">
              <button
                onClick={toggleUnit}
                className="text-sm px-3 py-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-500"
              >
                Switch to {unit === "celsius" ? "°F" : "°C"}
              </button>
            </div>

            <CurrentWeather
              weatherData={weatherData}
              city={cityData}
              unit={unit}
            />
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Open-Meteo API</p>
        </footer>
      </div>
    </div>
  );
}
