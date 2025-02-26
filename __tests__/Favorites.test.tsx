import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { CityDataT } from "@/lib/type";
import Favorites from "@/components/Favorites";

describe("Favorites Component", () => {
  const mockSetFavorites = jest.fn();
  const mockOnSelectCity = jest.fn();

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

  const mockFavorites: CityDataT[] = [
    {
      id: 2,
      name: "Paris",
      country: "France",
      latitude: 48.8566,
      longitude: 2.3522,
      elevation: 0,
      feature_code: "",
      country_code: "",
      admin1_id: 0,
      admin2_id: 0,
      timezone: "",
      population: 0,
      postcodes: [],
      country_id: 0,
      admin1: "",
      admin2: "",
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      latitude: 35.6762,
      longitude: 139.6503,
      elevation: 0,
      feature_code: "",
      country_code: "",
      admin1_id: 0,
      admin2_id: 0,
      timezone: "",
      population: 0,
      postcodes: [],
      country_id: 0,
      admin1: "",
      admin2: "",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders add to favorites button when current city is not in favorites", () => {
    render(
      <Favorites
        favorites={mockFavorites}
        setFavorites={mockSetFavorites}
        currentCity={mockCity}
        onSelectCity={mockOnSelectCity}
      />
    );

    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
  });

  test("does not render add button when current city is already in favorites", () => {
    const cityInFavorites = { ...mockCity, id: 2 }; // Same id as Paris in mockFavorites

    render(
      <Favorites
        favorites={mockFavorites}
        setFavorites={mockSetFavorites}
        currentCity={cityInFavorites}
        onSelectCity={mockOnSelectCity}
      />
    );

    expect(screen.queryByText("Add to Favorites")).not.toBeInTheDocument();
  });

  test("calls setFavorites when adding a city to favorites", () => {
    render(
      <Favorites
        favorites={mockFavorites}
        setFavorites={mockSetFavorites}
        currentCity={mockCity}
        onSelectCity={mockOnSelectCity}
      />
    );

    fireEvent.click(screen.getByText("Add to Favorites"));

    expect(mockSetFavorites).toHaveBeenCalledWith([...mockFavorites, mockCity]);
  });

  test("calls onSelectCity when clicking on a favorite city", () => {
    render(
      <Favorites
        favorites={mockFavorites}
        setFavorites={mockSetFavorites}
        currentCity={mockCity}
        onSelectCity={mockOnSelectCity}
      />
    );

    fireEvent.click(screen.getByText("Paris"));

    expect(mockOnSelectCity).toHaveBeenCalledWith("Paris");
  });

  test("removes city from favorites when clicking remove button", () => {
    render(
      <Favorites
        favorites={mockFavorites}
        setFavorites={mockSetFavorites}
        currentCity={mockCity}
        onSelectCity={mockOnSelectCity}
      />
    );

    const removeButtons = screen.getAllByText("×");
    fireEvent.click(removeButtons[0]); // Remove Paris

    expect(mockSetFavorites).toHaveBeenCalledWith([mockFavorites[1]]); // Should only keep Tokyo
  });
});
