import { useEffect, useState } from 'react';
import WeatherTypes from './types/WeatherTypes';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';

export default function App() {
  const [weather, setWeather] = useState<WeatherTypes | null>(null);
  const [city, setCity] = useState<string>('London');
  const [searchInput, setSearchInput] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const getWeather = async (city: string = 'London') => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      if (response.data) {
        setWeather(response.data);
      } else {
        setAlertMessage('City not found');
        setWeather(null);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setAlertMessage('Resource not found.');
        } else {
          setAlertMessage(`Request failed`);
        }
      } else {
        setAlertMessage('An unexpected error occurred.');
      }
      setWeather(null);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      getWeather(searchInput.trim());
      setSearchInput('');
    }
  }

  return (
    <>
      <main className="flex w-full min-h-screen bg-[url('https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover justify-center items-center">
        <section
          key={city}
          className="flex flex-col items-center gap-7 md:gap-5 bg-white/30 px-3 md:px-16 py-10 shadow-xl backdrop-blur-md max-sm:min-h-screen w-full md:max-w-xl lg:max-w-3xl md:rounded-xl"
        >
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

          {weather ? (
            <section className="text-center h-[600px] md:h-[500px] w-full flex flex-col justify-start md:justify-start gap-3 items-stretch">
              <h1 className="text-4xl font-semibold">{weather?.name}</h1>

              <div className="flex flex-col justify-start text-center text-sm">
                <div className="mx-auto">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                    alt="weather"
                    className="aspect-square w-40 md:w-54"
                  />
                </div>

                <div className="text-5xl md:text-6xl lg:text-7xl w-full">
                  {weather?.main.temp.toFixed(1)}°
                </div>
                <p className="text-2xl drop-shadow-2xl mt-5 first-letter:uppercase">
                  {weather?.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center p-5 text-sm my-auto">
                <div className="flex justify-evenly">
                  <span>Visibility</span>
                  <span>{(weather?.visibility ?? 'N/A') / 1000} Km</span>
                </div>

                <div className="flex justify-evenly">
                  <span>Feel like</span>
                  <span>{weather?.main.feels_like ?? 'N/A'}°</span>
                </div>

                <div className="flex justify-evenly">
                  <span>Humidity</span>
                  <span>{weather?.main.humidity ?? 'N/A'} %</span>
                </div>
                <div className="flex justify-evenly">
                  <span>Wind</span>
                  <span>{weather?.wind.speed ?? 'N/A'} m/s</span>
                </div>
              </div>
            </section>
          ) : (
            <div className="h-[600px] md:h-[500px] flex justify-center items-center">
              {/* <p>Weather not found</p> */}
              <p>{alertMessage}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
