import { searchCity } from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";

const useWeather = () => {
  const useGetWeatherByCity = (cityName: string) =>
    useQuery({
      queryKey: ["weatherByCity", cityName],
      queryFn: () => searchCity(cityName),
      enabled: !!cityName,
    });
  return { useGetWeatherByCity };
};

export default useWeather;
