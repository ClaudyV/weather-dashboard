import axios from "axios";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

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
