import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchItem: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          className="input-field px-4 py-3 pl-10 w-full rounded-r-md text-gray-500"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 py-2 bg-primary text-white rounded-r-md bg-gray-500 hover:bg-gray-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
