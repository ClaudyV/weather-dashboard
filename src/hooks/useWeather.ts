import { getWeatherData, searchCity } from "@/services/weatherService";

import { useQuery } from "@tanstack/react-query";

const useWeather = () => {
  const useGetWeatherByCity = (cityName: string) =>
    useQuery({
      queryKey: ["weatherByCity", cityName],
      queryFn: () => searchCity(cityName),
      enabled: !!cityName,
    });

  const useGetWeatherByCoordinates = (latitude: number, longitude: number) =>
    useQuery({
      queryKey: ["weatherByCoordinates", latitude, longitude],
      queryFn: () => getWeatherData(latitude, longitude),
      enabled: !!latitude && !!longitude,
    });

  return { useGetWeatherByCity, useGetWeatherByCoordinates };
};

export default useWeather;
