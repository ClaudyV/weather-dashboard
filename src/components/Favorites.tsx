import { CityDataT } from "@/lib/type";
import { FaStar } from "react-icons/fa";

interface FavoritesProps {
  favorites: CityDataT[];
  setFavorites: React.Dispatch<React.SetStateAction<CityDataT[]>>;
  currentCity: CityDataT;
  onSelectCity: (city: string) => void;
}

const Favorites = ({
  favorites,
  setFavorites,
  currentCity,
  onSelectCity,
}: FavoritesProps) => {
  const addToFavorites = (city: CityDataT) => {
    if (!city) return;

    // Check if city already exists in favorites
    if (!favorites.some((fav) => fav.id === city.id)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (cityId: number) => {
    const newFavorites = favorites.filter((city) => city.id !== cityId);
    setFavorites(newFavorites);
  };

  const isAlreadyFavorite = (cityId: number) =>
    favorites.some((fav) => fav.id === cityId);

  return (
    <div className="mb-6">
      {currentCity && !isAlreadyFavorite(currentCity.id) && (
        <button
          onClick={() => addToFavorites(currentCity)}
          className={
            "flex items-center text-sm px-3 py-1 rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        >
          <FaStar className={"mr-1 text-gray-400"} />
          Add to Favorites
        </button>
      )}

      {favorites.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-500 mb-2">
            Favorite Cities
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelectCity(city.name)}
                className={`text-sm px-3 py-1 rounded-full shadow-sm transition-shadow flex items-center 
                    ${
                      currentCity?.id === city.id
                        ? "bg-yellow-200 text-yellow-700 shadow-md"
                        : "bg-white text-gray-500 hover:shadow-md"
                    }`}
              >
                <span className="text-gray-500">{city.name}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(city.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  ×
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
