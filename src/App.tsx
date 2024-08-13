import { useEffect, useState } from 'react';
import WeatherTypes from './types/WeatherTypes';
import axios from 'axios';
import DataWeather from './components/Dataweather';
import SearchWeather from './components/SearchWeather';

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
      <main
        className={`flex w-full min-h-screen bg-[url(./assets/bg_image.jpg)] bg-cover justify-center items-center`}
      >
        <section className="flex flex-col items-center gap-7 md:gap-5 bg-white/30 px-3 md:px-16 py-10 shadow-xl backdrop-blur-md max-sm:min-h-screen w-full md:max-w-xl lg:max-w-3xl md:rounded-xl">
          <SearchWeather
            key={city}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSubmit={handleSubmit}
          />

          {weather ? (
            <DataWeather weather={weather} />
          ) : (
            <div className="h-[600px] md:h-[500px] flex justify-center items-center">
              <p>{alertMessage}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
