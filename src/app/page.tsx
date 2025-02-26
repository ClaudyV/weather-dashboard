"use client";

import useWeather from "@/hooks/useWeather";

export default function Home() {
  const { useGetWeatherByCity } = useWeather();

  const { data } = useGetWeatherByCity("Paris");

  console.log(data);
  return <div>Weather Dashboard</div>;
}
