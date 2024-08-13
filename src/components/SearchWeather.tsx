import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchWeatherProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchWeather: React.FC<SearchWeatherProps> = ({
  searchInput,
  setSearchInput,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        className="w-full rounded-md border-green-400 p-2.5 shadow-sm sm:text-sm  focus:outline-none focus:ring-4 "
        placeholder="Search city..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        autoComplete="local"
      />
      <span className="absolute inset-y-0 end-0 w-10">
        <button
          className="size-full flex items-center justify-center group"
          type="submit"
        >
          <IoSearch className="group-hover:text-white size-6 p-1 group-hover:bg-slate-500/50 rounded-full" />
        </button>
      </span>
    </form>
  );
};

export default SearchWeather;
